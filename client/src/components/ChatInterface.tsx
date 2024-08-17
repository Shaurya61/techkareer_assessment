import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import io, { Socket } from "socket.io-client";
import useAuth from "../hooks/useAuth"; // Assuming this is where your useAuth hook is

interface Message {
  content: string;
  senderId: number;
  receiverId: number;
  created_at: Date;
  updated_at: Date;
}

const ChatInterface: React.FC = () => {
  const { currentUser } = useAuth(); // Get current user from the authentication state
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (selectedUser && currentUser) {
      const room = [currentUser.id, selectedUser.id].sort().join("-");

      // Initialize socket connection if not already done
      if (!socketRef.current) {
        const socket = io("http://localhost:3000", {
          query: { userId: currentUser.id },
        });
        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("Connected to socket server");
        });

        // Listen for incoming messages
        socket.on("receiveMessage", (message: Message) => {
          // Only add the message if it wasn't sent by the current user
          if (message.senderId !== Number(currentUser.id)) {
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from socket server");
        });
      }

      // Join the room corresponding to both users
      socketRef.current.emit("joinRoom", room);

      return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
      };
    }
  }, [selectedUser, currentUser]);

  const handleSendMessage = () => {
    if (socketRef.current && message.trim() && currentUser && selectedUser) {
      const newMessage: Message = {
        content: message,
        senderId: Number(currentUser.id),
        receiverId: Number(selectedUser.id),
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Send the message to the server
      socketRef.current.emit("sendMessage", newMessage);

      // Add the message to the local state immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  if (!selectedUser || !currentUser) return null;

  return (
    <div className="flex flex-col h-screen w-full ml-4">
      <div className="">{selectedUser.name} Online</div>
      <div>typing...</div>
      <div className="h-full overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 ${msg.senderId === Number(selectedUser.id) ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded ${msg.senderId === Number(selectedUser.id) ? "bg-blue-200" : "bg-gray-200"}`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-500">
              
            </div>
          </div>
        ))}
      </div>
      <div className="mr-4 mt-auto">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

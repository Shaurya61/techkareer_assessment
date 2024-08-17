import ChatInterface from "../components/ChatInterface"
import ChatList from "../components/ChatList"

const Chat = () => {
  return (
    <div className="flex">
      <ChatList />
      <ChatInterface />
    </div>

  )
}

export default Chat
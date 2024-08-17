const ChatInterface = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className=" ">
        User Information(name, if online Green dot and if offline grey Dot)
      </div>
      <div>
        Typing.... 
      </div>

      <div className="">
        User Previous Messages and new messages are displayed here 
      </div>

      <div className="mr-4">
        <input type="text" placeholder="Type your message"></input>
        <button>Send message</button>
      </div>
      
    </div>
  )
}

export default ChatInterface
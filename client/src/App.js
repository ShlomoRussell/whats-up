import { socket } from "./socket/connect-socket";
import {createRef, useState} from 'react'
function App() {
  const [messages, setMessages] = useState([]);
  socket.on("receive-message", (message) => {
    console.log(message)
    setMessages([...messages,message])
  })
  const messageRef= createRef()
  const handleClick = () => {
    
    socket.emit("send-message", messageRef.current.value);
   
    }
  
  return (
    <div>
      <input type="text" ref={messageRef} />
      <button onClick={handleClick}>send</button>
      {messages.map((m) => (
        <div>{m}</div>
      ))}
    </div>
  );
}

export default App;

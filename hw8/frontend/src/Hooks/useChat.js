import {useState} from 'react';

const client = new WebSocket('ws://localhost:4000')
const sendData = (data) => {
  client.send(JSON.stringify(data))
}

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const clearMessages = () => {
    sendData(['clear']);
  }
  const sendMessage = (payload) => {
    sendData(['input', payload]);
  };
  client.onmessage = (byteString) => {
    const {data} = byteString
    const {task, payload} = JSON.parse(data)
    console.log(task)
    console.log(payload)
    switch(task){
      case "init":{
        console.log('init')
        setMessages(() => payload);
        console.log('inited...')
        break;
      }
      case "output": {
        setMessages(() => 
        [...messages, ...payload]); break;}
      case "status": {
        setStatus(payload); break;
      }
      case "cleared": {
        setMessages([])
        break;
      }
      default: break;
    }
  }
  return {
    status,
    messages, 
    sendMessage,
    clearMessages
  }
}

export default useChat;
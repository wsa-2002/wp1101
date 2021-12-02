import { useEffect, useState, useRef } from 'react'
// import './App.css'
import styled from "styled-components"
import { Button, Input, message, Tag } from 'antd'
import useChat from '../Hooks/useChat.js'
import Title from '../Components/Title.js'
import Message from '../Components/Message.js'
import SignIn from '../Containers/signIn.js'

const LOCALSTORAGE_KEY = "save-me"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`

function App() {
  const {status, messages, sendMessage, clearMessages} = useChat()
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || '')
  const [body, setBody] = useState('') // text body
  const [signedIn, setSignedIn] = useState(false)
  const bodyRef = useRef(null)
  const displayStatus = (payload) => {
    if (payload.msg){
      const {type, msg} = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch(type){
        case 'success':
          message.success(content)
          break;
        case 'info':
          message.success(content)
          break;
        case 'error':
        default:
          message.error(content)
          break;
      }
    }
  }
  useEffect(() => {
    if (signedIn){
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me])
  useEffect(() => {
    displayStatus(status)
  }, [status])
    return (
      <Wrapper>
        {signedIn? (
          <>
            <Title>
              <h1>Simple Chat</h1>
              <Button type="primary" danger onClick={clearMessages}>
                Clear
              </Button>
            </Title>
            <Message>
              {messages.length === 0 ? (
                <p style={{color: '#ccc'}}> No messages...</p>
              ) : (
                messages.map(({name, body}, i) => (
                  <p className='App-message' key={i}>
                    <Tag color="blue">{name}</Tag> {body}
                  </p>
                ))
              )}
            </Message>
            <Input
              onKeyDown={(e) => {
                if (e.key === 'Enter'){
                  bodyRef.current.focus()
                }
              }}
              placeholder="Username"
              style={{ marginBottom: 10 }}
              value={me}
              onChange={(e) => setMe(e.target.value)}
            ></Input>
            <Input.Search
              ref={bodyRef}
              enterButton="Send"
              placeholder="Type a message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onSearch={(msg) => {
                if(!msg || !me){
                  displayStatus({
                    type: 'error',
                    msg: 'Please enter a username and a message body'
                  })
                  return
                }
                sendMessage({name: me, body: msg})
                setBody('')
              }}
            ></Input.Search>
          </>)
        :<SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>
        }
        
      </Wrapper>
      )
}

export default App

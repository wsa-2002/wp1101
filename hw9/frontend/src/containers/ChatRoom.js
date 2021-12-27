import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Input, Tabs } from 'antd';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import ChatModal from './ChatModal';
import useChatBox from '../hooks/useChatBox';
import Title from '../components/Title';
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from '../graphql/index';

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px,
  padding: 20px;
  display: flex;
`

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [modalVisible, setModalVisible] = useState(false);
  const [now, setNow] = useState("");

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    variables: {
      sender_name: me,
      getter_name: now,
      body: messageInput,
    }
  });

  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger>Clear</Button>
      </Title>
      <>
        <Wrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((friend) => (
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
              <ChatBox me={me} friend={friend} key={friend} />
            </Tabs.TabPane>
          ))}
        </Wrapper>
        <ChatModal 
          visible={modalVisible}
          onCreate={ async ({ name }) => {
            setNow(name);
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });
            setActiveKey(() => createChatBox(name));
            setModalVisible(false);
          }}
          onChange={() => { setModalVisible(false); }}
        />
      </>
      <Input.Search 
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          }
          console.log("chatroom", me, now, messageInput)
          sendMessage({
            variables: { from: me, to: now, message: messageInput }
          });
          setMessageInput("");
        }}
      />
    </>
  )
}

export default ChatRoom;
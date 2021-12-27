import Message from '../components/Message';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { MESSAGE_SUBSCRIPTION, CHATBOX_QUERY } from '../graphql';

const Messages = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const ChatBox = ({ me, friend, ...props }) => {
  const messageFooter = useRef(null);
  console.log(friend)
  const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name: [me.toLowerCase(), friend.toLowerCase()].sort().join('_')
    },
  });

  const scrollToBottom = () => {
    messageFooter.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    try {
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { name: [me.toLowerCase(), friend.toLowerCase()].sort().join('_') },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.chatbox.data
          console.log('prev', prev.chatBoxes[0].messages[0])
          console.log('new mes', newMessage)
          return {
            chatBoxes: {
              messages: [...prev.chatBoxes[0].messages, newMessage],
            },
          };
        },
      });
    } catch (error) {}
  }, [subscribeToMore, friend, me]);

  if (loading) {
    return <p>loading...</p>
  }
  console.log('data', data);

  return (
    <Messages>
      {data && data.chatBoxes[0].messages.map(({ sender: { name }, body }, i) => (
        <Message me={me} name={name} body={body} key={name + body + i} />
      ))}
      <div ref={messageFooter} />
    </Messages>
  )
}

export default ChatBox;
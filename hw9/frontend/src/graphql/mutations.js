import { gql } from "@apollo/client/core";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!,
    $name2: String!
  ) {
    createChatBox(
      name1: $name1,
      name2: $name2
    ) {
      name
      messages {
        sender {
          name
        }
        body
      }
    }
  }
`

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender_name: String!,
    $getter_name: String!, 
    $body: String!
  ) {
    createMessage(
      sender_name: $sender_name, 
      getter_name: $getter_name, 
      body: $body
    ) {
      sender {
        name
      }
      body
    }
  }
`

export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage {
    deleteMessage
  }
`
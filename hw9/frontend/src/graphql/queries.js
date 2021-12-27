import { gql } from '@apollo/client/core';

export const CHATBOX_QUERY = gql`
query browse_chatbox (
  $name: String
){
  chatBoxes(name: $name) {
    id
    name
    messages {
      id
      sender{
        name
      }
      body
    }
  }
}
`

export const MESSAGE_QUERY = gql`
  query {
    messages {
      sender {
        name
      }
      body
    }
  }
`
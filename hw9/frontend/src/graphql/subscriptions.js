import { gql } from '@apollo/client/core';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription subscribe_chatbox (
    $name: String
  ){ 
    chatbox (
      name: $name
    ){
      mutation
      data {
        id
        sender {
          name
        }
        body
      }
    }
  }
`


/*
subscription subscribe_chatbox {
  chatbox(name: "daphnewsa") {
    mutation
    data {
      id
      sender {
        name
      }
      body
    }
  }
}
*/
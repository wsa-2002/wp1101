import Message from './models/message.js'

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
  sendData({task: "status", payload}, ws);
}

const initData = (ws) => {
  console.log('init...')
  Message.find({}, {"name": 1, "body": 1, "_id": 0}).sort({created_at: -1}).limit(100)
    .exec((err, res) => {
      if(err) throw err
      else {
        sendData({task: 'init', payload: res}, ws)
      }
    })
  console.log('inited...')
}

export {sendData, sendStatus, initData}
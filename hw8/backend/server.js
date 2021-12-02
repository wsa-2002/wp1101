import express from 'express'
import dotenv from 'dotenv-defaults'
import http from 'http'
import mongoose from 'mongoose'
import WebSocket, { WebSocketServer } from 'ws';
import {sendData, sendStatus, initData} from './wssConnect.js'
import Message from './models/message.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection
const port = process.env.port || 4000

const app = express()
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const broadcastMessage = (data, status) => {
  wss.clients.forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  })
}
db.once('open', () => {
  console.log('open')
  wss.on('connection', (ws) => {
    initData(ws);
    ws.onmessage = async (byteString) => {
      const {data} = byteString
      const [task, payload] = JSON.parse(data)
      switch (task) {
        case 'input':
          const {name, body} = payload
          const message = new Message({name, body})
          try {await message.save();}
          catch (e) {throw new Error('Message DB save error' + e);}
          broadcastMessage({task: 'output', payload: [payload]}, {type: 'success', msg: 'Message sent'})
          break;
        case 'clear': {
          Message.deleteMany({}, () => {
            broadcastMessage({task: 'cleared'}, {type: 'info', msg: 'Message cache cleared.'})
          })
          break;
        }
        default: break;
      }
    }
  })
  server.listen(port, () => {
    console.log('listen')
  })
})



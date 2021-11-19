import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import router from './routes/index.js'
import bodyParser from 'body-parser'
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then((res) => console.log('mongo db connection created'))
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(router)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})


const db = mongoose.connection;
db.on('error', (err) => console.log(err))

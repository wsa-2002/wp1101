import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongo = mongoose.connection
const port = process.env.port || 4000

mongo.once('open', () => {
  console.log('mongodb connected')
})

export default mongo;



import express from 'express'
import cors from 'cors'
import router from './routes/guess'

const app = express()

app.use(cors())

app.use('', router)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
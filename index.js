const express = require('express')
const app = express()
require('dotenv').config()
// const mongoose = require('mongoose')

const port = process.env.SERVER_PORT


app.use(express.json())
app.use('/api', require('./api/users/Router'))
app.use('/api', require('./api/products/Router'))


// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("something went wrong"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



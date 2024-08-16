const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dataRouter = require('./routes/setRouter')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/api', dataRouter)

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})
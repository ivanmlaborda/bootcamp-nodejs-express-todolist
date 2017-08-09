const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const app = express()
const PORT = 3001

global.tasks = [{
  id: 1,
  title: 'buy Highland Park',
  done: false,
  createdAt: +(new Date())
}]

const routesTask = require('./routes/task/')
const routesTasks = require('./routes/tasks/')


app.set('view engine', 'pug')
app.locals.pretty = true

app.use(express.static(path.join(__dirname,'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.locals.moment = moment

app.use(routesTask)
app.use(routesTasks)


app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)

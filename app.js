const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const app = express()
const PORT = 3001
var strftime = require('strftime')

app.set('view engine', 'pug')
app.locals.pretty = true

app.use(express.static(path.join(__dirname,'public')) )

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.locals.moment = moment

let tasks = [
  {
    id: 1,
    title: 'buy nachos',
    done: false,
    createdAt: +(new Date())
  },
  {
    id: 2,
    title: 'long island iced time',
    done: true,
    createdAt: +(new Date())
  },
  {
    id: 3,
    title: 'buy bitcoins',
    done: false,
    createdAt: +(new Date())
  },
  {
    id: 4,
    title: 'go to swim',
    done: true,
    createdAt: +(new Date())
  },
  {
    id: 5,
    title: 'GOT',
    done: false,
    createdAt: +(new Date())
  },
]

let counter = 5

app.get('/', (req,res) => {
  res.render('pages/tasks', { tasks })
})

app.post('/tasks', (req,res) => {
  const title = req.body.task
  const newTask = {
    id: ++counter,
    title,
    done: false,
    createdAt: +(new Date())
  }
  tasks.push(newTask)
  console.log(strftime('%d-%m-%Y %H:%M'))
  res.redirect('/')
})

app.delete('/task/:id', (req,res) => {
  const id = +req.params.id
  tasks = tasks.filter( task => task.id !== id )
  res.send(`element w/ id ${id} has been removed`)
})

app.put('/task/:id', (req,res) => {
  console.log('dataTitle: ' + req.body.title)
  const id = +req.params.id
  if (req.body.done) {
    const done = req.body.done === 'true' ? true : false
    tasks = tasks.map( task => {
      if (task.id === id) task.done = done
      return task
    })
  } else if (req.body.title) {
    const title = req.body.title
    tasks = tasks.map( task => {
      if (task.id === id) task.title = title
      return task
    })
  }

  res.send(`element w/ id ${id} has been updated`)
})

app.get('/completed', (req,res) => {
  let doneTasks = []
  doneTasks = tasks.filter( task => task.done )

  res.render('pages/completed', { doneTasks })
  console.log('doneTasks: ' + doneTasks[0].title)
})

app.listen(PORT)

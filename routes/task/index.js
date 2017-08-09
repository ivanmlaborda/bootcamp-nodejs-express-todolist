const express = require('express')
const router = express.Router()

// let tasks = []
// tasks = global.tasks

let counter = 1

router.delete('/task/:id', (req,res) => {
  console.log('delete pre tasks ' + tasks.length)
  console.log('delete pre global ' + global.tasks.length)
  const id = +req.params.id
  global.tasks = tasks.filter( task => task.id !== id )
  console.log('delete post tasks ' + tasks.length)
  console.log('delete  post global ' + global.tasks.length)
  res.send(`element w/ id ${id} has been removed`)
})

router.put('/task/:id', (req,res) => {
  const id = +req.params.id
  if (req.body.done) {
    const done = req.body.done === 'true' ? true : false
    global.tasks = tasks.map( task => {
      if (task.id === id) task.done = done
      return task
    })
  } else if (req.body.title) {
    const title = req.body.title
    global.tasks = tasks.map( task => {
      if (task.id === id) task.title = title
      return task
    })
  }

  res.send(`element w/ id ${id} has been updated`)
})

module.exports = router

const express = require('express')
const router = express.Router()

// let tasks = []
// tasks = global.tasks

let counter = 1

router.get('/', (req,res) => {
  console.log('pre get tasks' + tasks.length)
  console.log('pre get global' + global.tasks.length)
  res.render('pages/tasks', { tasks })
  console.log('post get tasks' + tasks.length)
  console.log('post get global' + global.tasks.length)
})

router.post('/tasks', (req,res) => {
  const title = req.body.task
  const newTask = {
    id: ++counter,
    title,
    done: false,
    createdAt: +(new Date())
  }
  global.tasks.push(newTask)
  res.redirect('/')
})

router.get('/completed', (req,res) => {
  let doneTasks = []
  doneTasks = tasks.filter( task => task.done )

  res.render('pages/completed', { doneTasks })
})

module.exports = router

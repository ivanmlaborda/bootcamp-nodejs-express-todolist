$('.remove').on('click', function(e) {

  const idTask = $(this).siblings('.task-id').val()
  const url = `/task/${idTask}`
  const method = 'DELETE'

  $.ajax({ url, method })
    .then( msg => {
      $(this).parent().remove()
      console.log(msg)
    })

})

$('.done').on('click', function(e) {
  const idTask = $(this).siblings('.task-id').val()
  const url = `/task/${idTask}`
  const method = 'PUT'
  const data = { done: true }

  $.ajax({ url, method, data })
    .then( msg => {
      $(this).parent().addClass('task-done')
      console.log(msg);
    })

})


$('.edit').on('click', function(e) {
  const idTask = $(this).siblings('.task-id').val()
  const url = `/task/${idTask}`
  const method = 'PUT'
  console.log('Editing task w/ id : ' + idTask)
  $(this).siblings('span').toggleClass('hidded')
  $(this).siblings('.task-edit').toggleClass('hidded')
  $(this).toggleClass('btn-warning pull-right btn-success')
  // $(this).toggleClass('btn-success')
  $(this).on('click', function(e) {
    const titleEdited = $(this).siblings('.task-edit').val()
    $(this).siblings('span').text(titleEdited)
    const data = {title: titleEdited}
    console.log(data.title + idTask)

    $.ajax({ url, method, data })

  })



})

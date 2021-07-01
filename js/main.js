// const timeStamp = new Date().toString()

const inputForm = document.querySelector('#input')
const submitBtn = document.querySelector('#submitBtn')
const ul = document.querySelector('ul')
const msg = document.querySelector('.empty-msg') // showing msg when list is empty

let todos = []

initList()

// init list
function initList() {
  todos = JSON.parse(localStorage.getItem('todo'))

  if (todos === null) {
    todos = []
    localStorage.setItem('todo', JSON.stringify(todos))
  }

  if (todos.length === 0) {
    localStorage.setItem('todo', JSON.stringify(todos))
    if (msg.classList.contains('d-none')) msg.classList.remove('d-none')
  } else {
    msg.classList.add('d-none')

    showList(todos)
  }

  inputForm.focus()
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const value = inputForm.value.trim()
  addTodo(value)
})

function showList(list) {
  todos = list
  ul.innerHTML = ''

  todos.forEach((todo) => {
    ul.innerHTML += `
        <li
          class="list-group-item d-flex align-items-center bg-transparent"
        >
          <input class="form-check-input me-3" type="checkbox" ${
            todo.checked ? 'checked' : ''
          } />
          <span class="me-auto ${
            todo.checked ? 'text-decoration-line-through' : ''
          }">${todo.todo}</span>
          <button class="btn btn-warning" onClick=deleteTodo("${
            todo.id
          }")>DELETE</button>
        </li>
        `
  })

  const checkBoxes = document.querySelectorAll('input[type=checkbox]')

  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener('click', (e) => {
      const checkedItemId = Number(
        checkBox.nextElementSibling.nextElementSibling
          .getAttribute('onClick')
          .split('"')[1]
      ) // getting checked todo's id

      if (checkBox.checked) {
        checkBox.nextElementSibling.classList.add(
          'text-decoration-line-through'
        )
        todos.map((todo) => {
          if (checkedItemId === todo.id) {
            todo.checked = true
          }
        })
        localStorage.setItem('todo', JSON.stringify(todos))
      } else {
        checkBox.nextElementSibling.classList.remove(
          'text-decoration-line-through'
        )
        todos.map((todo) => {
          if (checkedItemId === todo.id) {
            todo.checked = false
          }
        })
        localStorage.setItem('todo', JSON.stringify(todos))
      }
    })
  })
}

function addTodo(value) {
  msg.classList.add('d-none')

  todos.push({
    id: Math.floor(Math.random() * 100000),
    todo: value,
    checked: false,
  })

  localStorage.setItem('todo', JSON.stringify(todos))
  initList()
  inputForm.value = ''
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id != id)
  if (todos.length === 0) window.location.reload()

  localStorage.setItem('todo', JSON.stringify(todos))

  initList()
}

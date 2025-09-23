import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
// import { TodoDAO } from './services/todo.dao.js'
import { findAll } from './services/todo.dao.js'




let lines = "";

  const todos = await findAll()
  for (const todo of todos) {
    lines += `
      <tr>
      <td>${todo.id}</td>
      <td>${todo.title}</td>
      </tr>
    `
  }


document.querySelector('#app').innerHTML = `
  <table class="table">
    <thead>
    <tr>
      <th>Id</th>
      <th>Title</th>
    </tr>
    </thead>
    <tbody>
    ${lines}
    </tbody>
  </table>
`

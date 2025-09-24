//table
import '../style.css'
import { findAll } from '../services/todo.dao.js'

class TodoTable extends HTMLElement {
  connectedCallback() {
    this.refresh()
    this._onTodoSaved = () => this.refresh()
    document.addEventListener('todo-saved', this._onTodoSaved)
  }

  disconnectedCallback() {
    if (this._onTodoSaved) {
      document.removeEventListener('todo-saved', this._onTodoSaved)
    }
  }

  async refresh() {
    this.textContent = 'Loading...'

    const todos = await findAll()

    const title = document.createElement('h1')
    title.textContent = 'Todo List'

    const table = document.createElement('table')
    table.classList.add('table')

    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')

    const idHeader = document.createElement('th')
    idHeader.textContent = 'Id'

    const titleHeader = document.createElement('th')
    titleHeader.textContent = 'Title'

    headerRow.append(idHeader, titleHeader)
    thead.appendChild(headerRow)

    const tbody = document.createElement('tbody')

    for (const todo of todos) {
      const row = document.createElement('tr')

      const idCell = document.createElement('td')
      idCell.textContent = todo.id

      const titleCell = document.createElement('td')
      titleCell.textContent = todo.title

      row.append(idCell, titleCell)
      tbody.appendChild(row)
    }

    table.append(thead, tbody)

    this.replaceChildren(title, table)
  }
}



customElements.define('todo-table', TodoTable)

// const app = document.querySelector('#app')

// if (app) {
//   app.innerHTML = ''
//   app.appendChild(document.createElement('todo-table'))
// }





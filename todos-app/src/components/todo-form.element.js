import { save } from '../services/todo.dao.js'

class TodoForm extends HTMLElement {
  connectedCallback() {
    const form = document.createElement('form')
    form.classList.add('row', 'g-3', 'mb-4')

    const fieldWrapper = document.createElement('div')
    fieldWrapper.classList.add('col-auto')

    const label = document.createElement('label')
    label.classList.add('visually-hidden')
    label.setAttribute('for', 'todo-title')
    label.textContent = 'Title'

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'todo-title'
    input.name = 'title'
    input.required = true
    input.placeholder = 'Todo title'
    input.classList.add('form-control')

    fieldWrapper.append(label, input)

    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('col-auto')

    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.classList.add('btn', 'btn-primary', 'mb-3')
    submitButton.textContent = 'Add Todo'

    buttonWrapper.appendChild(submitButton)

    const status = document.createElement('p')
    status.classList.add('text-muted', 'm-0')

    form.append(fieldWrapper, buttonWrapper)

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const title = input.value.trim()
      if (!title) {
        status.textContent = 'Title is required.'
        return
      }

      submitButton.disabled = true
      status.textContent = 'Saving...'

      try {
        const savedTodo = await save({ title, completed: false })
        status.textContent = `Todo ${savedTodo.id} saved.`
        input.value = ''
        this.dispatchEvent(
          new CustomEvent('todo-saved', {
            detail: savedTodo,
            bubbles: true,
          }),
        )
      } catch (error) {
        console.error(error)
        status.textContent = 'Failed to save todo.'
      } finally {
        submitButton.disabled = false
      }
    })

    this.replaceChildren(form, status)
  }
}

customElements.define('todo-form', TodoForm)

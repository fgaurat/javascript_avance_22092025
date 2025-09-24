import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
// import { TodoDAO } from './services/todo.dao.js'
// import {findAll} from './services/todo.dao.js'
import dao from './services/todo.dao.js'




let lines = "";

const newTable = document.createElement("table");
const todos = await dao.findAll()

for (const todo of todos) {
  const tr = document.createElement("tr");
  const td_id = document.createElement("td");
  const td_title = document.createElement("td");
  td_id.appendChild(document.createTextNode(todo.id));
  td_title.appendChild(document.createTextNode(todo.title));

}


document.querySelector('#app')
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
const url = import.meta.env.VITE_TODOS_URL
document.querySelector('#app').innerHTML = `
  <div>
 url: ${url}
  </div>
`

setupCounter(document.querySelector('#counter'))

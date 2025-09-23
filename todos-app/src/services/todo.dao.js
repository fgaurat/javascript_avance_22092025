import { Todo } from '../core/entities/todo.dto'


const baseUrl = import.meta.env.VITE_TODOS_URL


async function  findById(id){
    const url = `${baseUrl}/${id}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    const todo = Todo.fromJson(data)
    return todo
}


async function  findAll(){
    const response = await fetch(baseUrl)
    const allData = await response.json()

    // const r = [1,2,3].map(i=>i*2)
    const todos = []

    for( const t of allData){
        todos.push(t)
    }
    // const todos = allData.map(jsontodo => Todo.fromJson(jsontodo))

    return todos
}

export {
    findById,findAll
}

//Data Access Object

//CRUD
//findAll():Todo[]
//save(todo)

const {Todo} = require('./todo.dto')//{theClass:Todo}

class TodoDAO{

    #baseUrl
    constructor(baseUrl='http://localhost:3000/todos'){
        this.#baseUrl = baseUrl
    }

    async findById(id){
        const url = `${this.#baseUrl}/${id}`
        
        const response = await fetch(url)
        const data = await response.json()
        
        const todo = Todo.fromJson(data)
        return todo
    }


    async findAll(){
        const response = await fetch(this.#baseUrl)
        const allData = await response.json()

        // const r = [1,2,3].map(i=>i*2)
        const todos = []

        for( const t of allData){
            todos.push(t)
        }
        // const todos = allData.map(jsontodo => Todo.fromJson(jsontodo))

        return todos
    }
}

module.exports = {
   TodoDAO
}

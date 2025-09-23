

async function getTodos() {
    const url = "http://localhost:3000/todos";

    const response = await fetch(url)
    
    return response.json()
}

async function main() {
    const todos = await getTodos()
    

    for (let t of todos) {
        console.log(t.title);
    }
}
main()

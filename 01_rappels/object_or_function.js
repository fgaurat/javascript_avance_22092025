

const todoObject =   {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
    toggle(){
        this.completed = !this.completed
    }
}


console.log(todoObject);
todoObject.toggle()
console.log(todoObject);



const createTodo = (title) =>{
    let completed = false
    const o = {
        get title(){
            return title
        },
        isCompleted(){
            return completed
        },
        toggle(){
            completed = !completed
        }        
    }
    return o
}
const t = createTodo("Formation JS")
console.log(t.title)
t.toggle()
console.log(t.isCompleted())
t.toggle()
console.log(t.isCompleted())



const {theClass:Tutu} = require('./todo.dto')//{theClass:Todo}


const t = new Tutu({id:1,userId:12,title:"Title"})

console.log(t);

const main = async ()=>{
    const dao = new TodoDAO();
    const todo = await dao.findById(1)
    console.log(todo);
    

}

// main()



const o = {
    name:"GAURAT",
    job:"dev",
    age:28,
    firstName:"Fred",
}

const {name,age,...leReste} = o
// const {name} = o
console.log(name);
console.log(age);
console.log(leReste);

const o2 = {...o,age:49} // {name:"GAURAT",firstName:"Fred",age:28,job:"dev"}
// const o2 = o

o.firstName = "Toto"
console.log(o);
console.log(o2);


const a = [0,1,2,3]
const [i,j,...r] = a
console.log(i);
console.log(j);
console.log(r);

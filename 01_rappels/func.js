
function add(a, b) {
    const c = a + b
    return c
}

const add2 = function (a, b) {
    const c = a + b
    return c
}

const add3 = (a, b) => {
    const c = a + b
    return c
}

const add4 = (a, b) => a + b


setTimeout(() => console.log("hello"), 5000)


// let add = 1000

const r = add(2, 3)
console.log(r);

const r2 = add2(2, 3)
console.log(r2);

const createCounter = (start=0) => {

    let value = start++

    return value

}

const counter = createCounter(5)
console.log(counter()); //6
console.log(counter());//7
const counter2 = createCounter(5)
const counter3 = createCounter(6)

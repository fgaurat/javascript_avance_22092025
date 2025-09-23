
function getTodo(id, t = 1000) {
    const p = new Promise((resolve, reject) => {

        if (id > 0) {

            setTimeout(() => {
                const todo = {
                    id,
                    title: `Todo id : ${id}`,
                    completed: false
                }
                resolve(todo)

            }, t)
        }
        else {
            reject({ message: 'Bad Id !', error: 12 })
        }
    })


    return p
}


function processTodo(todo) {
    console.log("voici la todo", todo)
}

// const pTodo = getTodo(1)
// console.log(pTodo);
// getTodo(0).then(console.log, console.error)
// getTodo(0).then((todo) => console.log("todo", todo), (err) => console.error("err", err))

// getTodo(1).then(todo => {
//     console.log(todo)
//     return getTodo(0)
// }).then(todo => {
//     console.log(todo)
// }).catch(e => console.error('catch',e))



//#region comment
// pTodo.then(console.log)
// pTodo.then(todo => {
//     console.log(todo)
//     return getTodo(todo.id + 1)

// })
//     .then(todo => {
//         console.log(todo)
//         return getTodo(todo.id + 1)
//     })
//     .then(todo => {
//         console.log(todo)
//         return getTodo(todo.id + 1)
//     })
//     .then(todo => {
//         console.log(todo)
//         return getTodo(todo.id + 1)
//     })


// // pTodo.then(todo => console.log(todo))

// // pTodo.then(processTodo)
// // pTodo.then(todo => processTodo(todo))
//#endregion

// getTodo(1).then(console.log)
// getTodo(1).then(console.log)


// const p1 = getTodo(1)
// const p2 = getTodo(2)
// const p3 = getTodo(3)
// const p4 = getTodo(4)

// Promise.all([p1,p2,p3,p4]).then(arr => {
//     console.log(arr);
// })

// const p1 = getTodo(0, 200)
// const p2 = getTodo(2, 300)
// const p3 = getTodo(3, 400)
// const p4 = getTodo(4, 500)

// Promise.race([p1, p2, p3, p4]).then(console.log).catch(console.error);




async function main() {
    console.log("start");

    const t1 = await getTodo(1, 200)
    console.log(t1);

    const t2 = await getTodo(t1.id + 1, 300)
    console.log(t2);
    console.log("end");
}

// main()
// console.log("after");


async function main2() {

    try {
        console.log("start");

        const p1 = getTodo(1, 200)
        const p2 = getTodo(0, 300)
        const p3 = getTodo(3, 300)
        const p4 = getTodo(4, 300)

        const arr = await Promise.all([p1, p2, p3, p4])
        console.log(arr);


        console.log(t2);
        console.log("end");
    }
    catch (e) {
        console.error("erreur", e);

    }
    finally {
        console.log("finally");
    }
}

main2()
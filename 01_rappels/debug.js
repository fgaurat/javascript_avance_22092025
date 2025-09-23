


function debugFunction() {
    console.log("Un log")
    console.info("Un log")
    console.warn("Un log")
    console.error("Un log")
    const todoObject = {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
        toggle() {
            this.completed = !this.completed
        }
    }

    console.table(todoObject)

    // debugger

    console.time("Loop")
    for (let i = 0; i < 10000; i++) {
        console.log(Math.sqrt(i))
    }
    console.timeEnd('Loop')




    function f1() {
        console.trace('La trace')
    }

    function f2() {
        f1()
    }

    function f3() {
        f2()
    }

    f3()

}

debugFunction()


console.trace('From root')

const start = () => {
    const theButton = document.getElementById('theButton')

    theButton.addEventListener('click', () => {
        // debugger
        console.log("theButton.onclick");

    })

}

document.addEventListener('DOMContentLoaded', start)

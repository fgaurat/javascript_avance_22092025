

document.addEventListener('DOMContentLoaded', () => {

    const google_link = document.getElementById('google_link')
    const div_1 = document.getElementById('div_1')
    const div_2 = document.getElementById('div_2')
    const tbl = document.getElementById('tbl')
    
    
    div_1.addEventListener('click', (event) => {
        console.log("click div_1")
        console.log("target click div_1",event.target)
        console.log("currentTarget click div_1",event.currentTarget)
    })
    div_2.addEventListener('click', (event) => {
        console.log("click div_2")
    })
    tbl.addEventListener('click', (event) => {
        console.log("delete todo")
    })
    google_link.addEventListener('click', (event) => {
        event.preventDefault()
        // event.stopPropagation()
        console.log("click");
        console.log("a target",event.target);
        console.log("a currentTarget",event.currentTarget);
    })



})
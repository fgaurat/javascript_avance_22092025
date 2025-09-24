


document.addEventListener('DOMContentLoaded', () => {


    const btn1 = document.getElementById('btn1')
    btn1.addEventListener('click', () => {

        localStorage.setItem("monChat", "localStorageTom");
    })
    const btn2 = document.getElementById('btn2')
    btn2.addEventListener('click', () => {

        sessionStorage.setItem("monChat", "sessionStorageTom");
    })



})
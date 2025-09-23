# Formation Javscript Avancé 22/09

https://notepad.re/jsav

https://www.m2iformation.fr/


https://nodejs.org/fr

http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D


https://jsonplaceholder.typicode.com/todos











function getTodo(id) {
    const p = new Promise((resolve, reject) => {
        setTimeout(() => { // on encapsule pour simuler une latence
            if (id <= 0) {
                reject({message: 'bad id', code: 10}); // je déclenche une erreur
            } else {
                const todo = {
                    id, // équivaut à : id: id,
                    title: `Todo id : ${id}`,
                };

                resolve(todo); // j'accompli ma promesse 
            }
        }, 1000);
    });

    return p; // je retourne une promesse qui sera executer
}

console.log("===== FONCTIONNEMENT STANDARD =====");

// const pTodo = getTodo(1);
// console.log(pTodo);
getTodo(1).then(console.log, console.error);
// getTodo(0).then((todo) => console.log("todo", todo), (err) => console.error('err', err));

console.log("===== EXEMPLE CHAINE AVEC CATCH =====");

getTodo(1).then(todo => {
    console.log(todo);
    return getTodo(0);
}).then(todo => { // ici la ligne précédente getTodo(0) déclenche un reject et ce then ne le catch pas par une méthode en second argument, on tombe donc dans le catch qui va catcher tous les rejects des then qui n 'ont pas de méthodes dédiées en second argument (si il y a un handler dans le then, le catch n'est pas éxécuté)
    console.log(todo);
}).catch(e => console.error('on est dans le catch', e))













































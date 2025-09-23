function theFunction() {
    var a = 2
    console.log("theFunction",a)

    if(true){
        // var b = 12 scope function
        let b = 12
        const c = 13
        console.log("if",b)
        console.log("if",c)
        // c = 1000 
    }
    // console.log("out if",b)

}

theFunction()
// console.log("out",a)


const a = [12,13,14,15];
console.log(a)
a.push(16)
console.log(a)
a = [16,17];

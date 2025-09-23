

class Rectangle {

    #longueur
    #largeur

    constructor(longueur, largeur) {
        this.#longueur = longueur
        this.#largeur = largeur
    }


    get longueur() {
        return this.#longueur
    }
    get largeur() {
        return this.#largeur
    }
    set longueur(value) {
        this.#longueur = value
    }

    set largeur(value) {
        this.#largeur = value
    }

    get surface() {
        return this.#largeur * this.#longueur
    }

    toString(){
        return `Rectangle ${this.longueur} ${this.largeur}`
    }
}



class Carre extends Rectangle{
    #cote
    constructor(cote){
        super(cote,cote)
        this.#cote = cote
    }
    get cote(){
        return this.#cote
    }
    set cote(value){
        this.#cote = value
    }
    toString(){
        return `Carre ${this.#cote}`
    }
}

const r = new Rectangle(2, 3)
const c = new Carre(4)
console.log(r.longueur,r.largeur,r.surface);
console.log(String(r));
console.log(String(c));
console.log(c.cote,c.surface);

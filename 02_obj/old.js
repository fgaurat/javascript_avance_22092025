/**
 * TP Rectangle / Carre (style prototype classique)
 * ------------------------------------------------
 * 1. Executer `node src/04_tp_poo/08-rectangle-carre_old.js`.
 * 2. Observer la definition des constructeurs `Rectangle` et `Carre` via prototypes (`__proto__` / Object.create).
 * 3. Ajouter une methode supplementaire sur `Rectangle.prototype` et verifier que `Carre` en herite.
 * 4. Comparer avec la version moderne `08-rectangle-carre.js` pour voir l'equivalence.
 */

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}



function Rectangle2(width, height) {
    this.width = width;
    this.height = height;
    this.prototype.surface = () =>{
        return this.width * this.height;
    };

    this.prototype.describe = () => {
        return "Rectangle " + this.width + "x" + this.height + ", surface " + this.surface();
    };

}

Rectangle.prototype.surface = function surface() {
    return this.width * this.height;
};

Rectangle.prototype.describe = function describe() {
    return "Rectangle " + this.width + "x" + this.height + ", surface " + this.surface();
};

function Carre(size) {
    Rectangle.call(this, size, size);
}

Carre.prototype = Object.create(Rectangle.prototype);
Carre.prototype.constructor = Carre;

const rect = new Rectangle(4, 6);
console.log(rect.describe());

const square = new Carre(5);
console.log(square.describe());
console.log("Surface carre =>", square.surface());

console.log("Prototype Carre === Rectangle.prototype ?", Object.getPrototypeOf(square) === Carre.prototype);
console.log("Carre.prototype.__proto__ === Rectangle.prototype ?", Carre.prototype.__proto__ === Rectangle.prototype);


r2 = new Rectangle2(2,3)
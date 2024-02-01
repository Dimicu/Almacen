
class Articulo {
    constructor(codigo, articulo, descripcion, numeroUd, precioUd, fecha) {
        this.cod = codigo;
        this.art = articulo;
        this.desc = descripcion;
        this.numUd = numeroUd;
        this.precUd = precioUd;
        this.fec = fecha;
    }
}


const abc = "abcdefghijklmnñopqrstuvwxyz";
var arrayArticulos = [];

function formarNum() {

    let articulo = document.getElementById("articulo").value;
    let array = articulo.split("");
    let suma = 0;

    let arrayNumeros = array.map(element => {
        return abc.indexOf(element);
    });
    arrayNumeros.forEach(element => {
        suma += element;
        return suma;
    })
    return suma;
}

function formarLetra() {
    let articulo = document.getElementById("articulo").value;
    let letrasCod = "";
    console.log(articulo.length);
    if (articulo.length < 6) {
        letrasCod = articulo.substring(0, 2);
    } else {
        letrasCod = articulo.substring(0, 3);
    }
    return letrasCod;
}

function formarCodigo() {

    return formarLetra() + "_" + formarNum();

}

function agregarArt() {
    let codigo = formarCodigo();
    let articulo = document.getElementById("articulo").value;
    let descripcion = document.getElementById("descripcion").value;
    let numeroUd = document.getElementById("numeroUnidades").value;
    let precioUd = document.getElementById("precioUnidades").value;
    let fecha = document.getElementById("fechaArticulo").value;

    let nuevoArticulo = new Articulo(codigo, articulo, descripcion, numeroUd, precioUd, fecha);
    console.log(nuevoArticulo);
    arrayArticulos.push(nuevoArticulo);
}
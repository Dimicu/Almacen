
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
    let precioUd = document.getElementById("precioUnidades").value ;
    /*Parseo de float del precio y limitacion de dos decimales, ademas de añadir el simbolo euro */

    let precioDecimal= parseFloat(precioUd).toFixed(2);



    let tiempo = document.getElementById("fechaArticulo").value;
    //Sacamos los dias meses y años segun nos lo metan DD-MM-AAAA , o DD-MM-AA
    let periodos = tiempo.split("-");
    let dias = parseInt(periodos[0]);

    let meses = parseInt(periodos[1]);
    let anos = parseInt(periodos[2]);
    let fecha = new Date(anos, meses - 1, dias - 1)
    //Añadimos options para toLocaleSateString ya que sino nos saca un formato de fecha que no queremos
    let options = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }
    let fechaSimple = fecha.toLocaleDateString("es-ES", options);
    //Añadimos la regExp para que ponga - y no / en la tabla de fecha.
    let regExp = /\//g;
    let fechaGuiones = fechaSimple.replace(regExp, "-");

    //Creamos el objeto con sus propiedades
    let nuevoArticulo = new Articulo(codigo, articulo, descripcion, numeroUd, precioDecimal, fechaGuiones);
    console.log(nuevoArticulo);
    arrayArticulos.push(nuevoArticulo);
}

function consultarArt() {
    let tabla = document.getElementById("tabla");

    if (arrayArticulos.length !== 0) {
        let fila = "";
        let celda = "";
        arrayArticulos.forEach(element => {
            fila = tabla.insertRow(-1);
            let valoresElemento = Object.values(element);
            for (let i = 0; i < valoresElemento.length; i++) {
                celda = fila.insertCell(-1);
                celda.innerHTML = valoresElemento[i];
            }
        });
    } else {
        document.getElementById("mensaje").innerHTML = "La lista de articulos esta vacia";
    }
}

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
        numeroUd = parseInt(numeroUd);
    let precioUd = document.getElementById("precioUnidades").value;
    /*Parseo de float del precio y limitacion de dos decimales, ademas de añadir el simbolo euro */
    let precioDecimal = parseFloat(precioUd).toFixed(2);



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

    arrayArticulos.push(nuevoArticulo);
}

function borrarTabla() {
    document.getElementById("tabla").innerHTML = "";
    let cabecera = "<tr><th>Codigo</th><th>Articulo</th><th>Descripcion</th><th>NumeroUd</th><th>PrecioUd</th><th>Fecha</th></tr>";
    document.getElementById("tabla").innerHTML = cabecera;
}


function consultarArt() {

    borrarTabla();

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

function listarPorFecha() {
    let valorRef = prompt("Introduce la fecha de referencia");
    let periodos = valorRef.split("-");
    let dias = parseInt(periodos[0]);
    let meses = parseInt(periodos[1]);
    let anos = parseInt(periodos[2]);

    let fecha = new Date(anos, meses - 1, dias - 1)
    let valorMili = fecha.getTime();
    console.log(fecha);
    console.log(valorMili);

    let resultadoFechas = [];
    //Filter por cada elemento del array , coge su element.fec y crea un objeta fecha
    //y le pasamos el getTime() para compararlo con el del valor dado.
    resultadoFechas = arrayArticulos.filter(element => {
        let fechaObjeto = element.fec;
        let periodos = fechaObjeto.split("-");
        let dias = parseInt(periodos[0]);
        let meses = parseInt(periodos[1]);
        let anos = parseInt(periodos[2]);

        let fechaObjetoArticulo = new Date(anos, meses, dias).getTime();
        return ((fechaObjetoArticulo - valorMili) > 0);
    })

    //resultado un array con los elementos que superen el filter
    if (resultadoFechas.length !== 0) {
        pintarArticulosPorFecha(resultadoFechas);
    } else {
        document.getElementById("mensaje").innerHTML = "La lista de articulos esta vacia";
    }



}

function pintarArticulosPorFecha(array) {

    document.getElementById("tablaFecha").innerHTML = "";
    let tabla = document.getElementById("tablaFecha");

    document.getElementById("mensaje").innerHTML = "Existen los siguientes articulos"

    let cabecera = "<tr><th>Codigo</th><th>Articulo</th><th>Descripcion</th><th>NumeroUd</th><th>PrecioUd</th><th>Fecha</th></tr>";
    document.getElementById("tablaFecha").innerHTML = cabecera;

    if (array.length !== 0) {
        let fila = "";
        let celda = "";
        array.forEach(element => {
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
function calcularValor() {

    let tablaValor = document.getElementById("tablaValor");
    let cabecera = "<tr><th>Articulo</th><th>NumeroUd</th><th>PrecioUd</th><th>Subtotal</th></tr>";
    document.getElementById("tablaValor").innerHTML = cabecera;

    
        let fila = "";
        let celda = "";
        arrayArticulos.forEach(element => {
            fila = tablaValor.insertRow(-1);
            let valoresElemento = [element.art,element.numUd,element.precUd]
            for (let i = 0; i < valoresElemento.length; i++) {
                celda = fila.insertCell(-1);
                celda.innerHTML = valoresElemento[i];
            }
            celda = fila.insertCell(-1);
            celda.innerHTML=element.numUd*element.precUd;
        });
    

    let arrayValores= arrayArticulos.map(element => {
        console.log(element.numUd * element.precUd);
        return element.numUd * element.precUd;

        /*AL FINAL SOLO HE PINTADO EL VALOR TOTAL, QUE ES LO QUE PIDE, A MEJORAR SERIA UNA TABLA 
        NUEVA CON LOS VALORES TOTALES DE LAS PIEZAS Y QUE SUME LAS UNIDADES SI TIENEN LA MISMA DESCRIPCION
        PARA PONER UNA SOLA FILA. */
        /*
        
        MI INTENCION ES RECORRER EL ARRAY Y VER SI LAS DESCRIPCIONES CONCUERDAN, SI SON IGUALES, ES QUE 
        ES EL MISMO ARTICULO, ASI QUE SUMAR LAS CANTIDADES Y MULTIPLICAR POR EL VALOR UNITARIO, AL FINAL
        SACAR EN UNA TABLA*/


    });

    let valor = arrayValores.reduce((total,sum)=>{
        return total+sum;
    },0);

    document.getElementById("valor").innerHTML=valor;
}
const URL ='http://localhost:2023';

//esta es mi funcion para loguearme
export async function Login(datos){
    console.log(datos)
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/Login`, Options);
    const data= await respuesta.json();
    return data
}

/////////registro/////////
export async function Registro(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/Registro`, Options)
    const data= await respuesta.json()
    return data;
}
/////////libros/////////////
export async function getLibros(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/libros`, Options)
    const data= await respuesta.json()
    return data;
}
///////////////EDITORIAL//////////////

export async function getEditorial(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/editorial`, Options)
    const data= await respuesta.json()
    return data;
}
////////AGREGAR EDITORIAL METODO POST/////////
export async function AddEditorial(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/editorial`, Options)
    const data= await respuesta.json()
    return data;
}

////////////FIN EDITORIAL//////////////


////////////AUTORES/////////

export async function getAutores(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/autores`, Options)
    const data= await respuesta.json()
    return data;
}
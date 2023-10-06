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

////////////ROLES/////////
export async function getRoles(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/roles`, Options)
    const data= await respuesta.json()
    return data;
}


///////////LISTAR USUARIOS/////////
export async function getUsuarios(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json()
    return data;
}

////////////USUARIOS POR ID/////////
export async function getUsuariosByID(id_usuario){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json();
    return data[0];
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
///////////////EDITORIAL POR ID////////////
export async function getEditorialByID(id_editorial){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
    const data= await respuesta.json();
    return data[0];
}
/////////////EDITAR EDITORIAL////////////
export async function EditEditorial(datos, id_editorial){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
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
/////////////////CAMBIAR ESTADO EDITORIAL//////////
export async function ActualizarEstadoEditorial(id_editorial, actulizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
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

///////////////AUTORES POR ID////////////
export async function getAutoresByID(id_autor){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json();
    return data[0];
}

////////AGREGAR AUTORES METODO POST/////////
export async function AddAutores(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/autores`, Options)
    const data= await respuesta.json()
    return data;
}

////////////CAMBIAR ESTADO AUTOR//////////

export async function ActualizarEstadoAutores(id_autor, actulizar){
    const Options={
        method:'PUT',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}
///////////ELIMINAR AUTOR////////////
export async function deleteAutor(id_autor){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}

/////////////EDITAR AUTORES////////////
export async function EditAutores(datos, id_autor){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}
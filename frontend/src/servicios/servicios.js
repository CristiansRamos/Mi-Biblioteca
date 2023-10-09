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
///////////ELIMINAR USUARIOS////////////
export async function deleteUsuario(id_usuario){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}

////////////menu
export async function getMenuByRol(id_rol){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'GET',
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu/${id_rol}`, Options)
   const data= await respuesta.json();
   return data;
}

export async function ver_permisos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'POST',
       body: JSON.stringify(datos),
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu_permisos`, Options)
   const data= await respuesta.json();
   console.log('respuesta de permisos', data)
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
////////////LECTORES/////////

export async function getLectores(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/lectores`, Options)
    const data= await respuesta.json()
    return data;
}
////////AGREGAR LECTORES METODO POST/////////
export async function AddLector(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/lectores`, Options)
    const data= await respuesta.json()
    return data;
}
///////////ELIMINAR LECTOR////////////
export async function deleteLector(id_lector){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/lectores/${id_lector}`, Options)
    const data= await respuesta.json()
    return data;
}

////////////PRESTAMOS/////////

export async function getPrestamos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const respuesta = await fetch(`${URL}/prestamos`, Options)
    const data= await respuesta.json()
    return data;
}

///////////ELIMINAR PRESTAMO////////////
export async function deletePrestamo(id_prestamo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/prestamos/${id_prestamo}`, Options)
    const data= await respuesta.json()
    return data;
}
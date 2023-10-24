const URL ='http://localhost:2025';

//esta es mi funcion para loguearme
export async function Login(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    /* console.log(datos) */
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/Login`, Options);
    const data= await respuesta.json();
    return data
}

/////////registro/////////
export async function Registro(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/Registro`, Options)
    const data= await respuesta.json()
    return data;
}

////////////ROLES/////////
export async function getRoles(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/roles`, Options)
    const data= await respuesta.json()
    return data;
}


///////////LISTAR USUARIOS/////////
export async function getUsuarios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json()
    return data;
}

////////////USUARIOS POR ID/////////
export async function getUsuariosByID(id_usuario){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json();
    return data[0];
}
/////////////EDITAR USUARIOS////////////
export async function EditUsuario(datos, id_usuario){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}
///////////ELIMINAR USUARIOS////////////
export async function deleteUsuario(id_usuario){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
   /* console.log('respuesta de permisos', data) */
   return data;
}

/////////libros/////////////
export async function getLibros(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

        }
    }
    const respuesta = await fetch(`${URL}/libros`, Options)
    const data= await respuesta.json()
    return data;
}

////////AGREGAR LIBROS METODO POST/////////
export async function AddLibros(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/libros`, Options)
    const data= await respuesta.json()
    return data;
}

////////////CAMBIAR ESTADO LIBROS//////////

export async function ActualizarEstadoLibros(id_libro, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/libros/${id_libro}`, Options)
    const data= await respuesta.json()
    return data;
}

///////////ELIMINAR LIBROS////////////
export async function deleteLibros(id_libro){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/libros/${id_libro}`, Options)
    const data= await respuesta.json()
    return data;
}

///////////GENEROS////////////

export async function getGeneros(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/generos`, Options)
    const data= await respuesta.json()
    return data;
}
///////////UBICACION///////////

export async function getUbicaciones(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json()
    return data;
}
///////////////UBICACION POR ID////////////
export async function getUbicacionByID(id_ubicacion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json();
    return data[0];
}

/////////////AGREGAR UBICACION///////////
export async function AddUbicacion(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json()
    return data;
}
/////////////EDITAR UBICACION////////////
export async function EditUbicacion(datos, id_ubicacion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}

///////////ELIMINAR UBICACION////////////
export async function deleteUbicacion(id_ubicacion){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}
/////////////////CAMBIAR ESTADO UBICACION//////////
export async function ActualizarEstadoUbicacion(id_ubicacion, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}


///////////////EDITORIAL//////////////

export async function getEditorial(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial`, Options)
    const data= await respuesta.json()
    return data;
}
///////////////EDITORIAL POR ID////////////
export async function getEditorialByID(id_editorial){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
    const data= await respuesta.json();
    return data[0];
}
/////////////EDITAR EDITORIAL////////////
export async function EditEditorial(datos, id_editorial){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
    const data= await respuesta.json()
    return data;
}

////////AGREGAR EDITORIAL METODO POST/////////
export async function AddEditorial(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial`, Options)
    const data= await respuesta.json()
    return data;
}
/////////////////CAMBIAR ESTADO EDITORIAL//////////
export async function ActualizarEstadoEditorial(id_editorial, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
    const data= await respuesta.json()
    return data;
}
///////////ELIMINAR EDITORIAL////////////
export async function deleteEditorial(id_editorial){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/editorial/${id_editorial}`, Options)
    const data= await respuesta.json()
    return data;
}

////////////FIN EDITORIAL//////////////


////////////AUTORES/////////

export async function getAutores(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores`, Options)
    const data= await respuesta.json()
    return data;
}

///////////////AUTORES POR ID////////////
export async function getAutoresByID(id_autor){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json();
    return data[0];
}

////////AGREGAR AUTORES METODO POST/////////
export async function AddAutores(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores`, Options)
    const data= await respuesta.json()
    return data;
}

////////////CAMBIAR ESTADO AUTOR//////////

export async function ActualizarEstadoAutores(id_autor, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}
///////////ELIMINAR AUTOR////////////
export async function deleteAutor(id_autor){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}

/////////////EDITAR AUTORES////////////
export async function EditAutores(datos, id_autor){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/autores/${id_autor}`, Options)
    const data= await respuesta.json()
    return data;
}
////////////LECTORES/////////

export async function getLectores(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores`, Options)
    const data= await respuesta.json()
    return data;
}
///////////////LECTORES POR ID////////////
export async function getLectorByID(id_lector){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores/${id_lector}`, Options)
    const data= await respuesta.json();
    return data[0];
}

////////AGREGAR LECTORES METODO POST/////////
export async function AddLector(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores`, Options)
    const data= await respuesta.json()
    return data;
}

////////////CAMBIAR ESTADO LECTORES//////////

export async function ActualizarEstadoLectores(id_lector, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores/${id_lector}`, Options)
    const data= await respuesta.json()
    return data;
}

///////////ELIMINAR LECTOR////////////
export async function deleteLector(id_lector){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores/${id_lector}`, Options)
    const data= await respuesta.json()
    return data;
}
/////////////EDITAR LECTOR////////////
export async function EditLector(datos, id_lector){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/lectores/${id_lector}`, Options)
    const data= await respuesta.json()
    return data;
}

////////////PRESTAMOS/////////

export async function getPrestamos(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamos`, Options)
    const data= await respuesta.json()
    return data;
}

///////////ELIMINAR PRESTAMO////////////
export async function deletePrestamo(id_prestamo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamos/${id_prestamo}`, Options)
    const data= await respuesta.json()
    return data;
}

////////AGREGAR PRESTAMO METODO POST/////////
export async function AddPrestamos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamos`, Options)
    const data= await respuesta.json()
    return data;
}

////////////CAMBIAR ESTADO PRESTAMOS//////////

export async function ActualizarEstadoPrestamos(id_prestamo, actulizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamos/${id_prestamo}`, Options)
    const data= await respuesta.json()
    return data;
}
///////////////PRESTAMO POR ID////////////
export async function getPrestamoByID(id_prestamo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamo/${id_prestamo}`, Options)
    const data= await respuesta.json();
    return data[0];
}
/////////////EDITAR PRESTAMO////////////
export async function EditPrestamo(datos, id_prestamo){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/prestamos/${id_prestamo}`, Options)
    const data= await respuesta.json()
    return data;
}

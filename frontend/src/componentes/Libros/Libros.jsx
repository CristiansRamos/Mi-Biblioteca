import React, { useEffect, useState } from "react";
import * as API from "../../servicios/servicios";
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddLibros } from "./AddLibros";
import { Vigia } from "../../Vigia";

export function Libros() {
  const [Libros, setLibros] = useState([]);
  const [mensaje, setMensaje] = useState([]);
  const [rol, setRol] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.getLibros().then(setLibros);
    const datos_usuario = JSON.parse(localStorage.getItem("usuario"));

    setRol(datos_usuario.id_rol);
  }, []);

  ////////////////////////////////////////

  ///////////////////////////////////////

  ////////////ELIMINAR////////////
  const eliminar = async (id_libro) => {
    Swal.fire({
      title: "Está seguro que quiere eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const borrado = await API.deleteLibros(id_libro);
        if (borrado.status) {
          setTimeout(() => {
            window.location.href = "/libros";
          }, 1000);
          Swal.fire("Eliminado!");
        } else {
          Swal.fire("No se puede Eliminar Porque Está en uso");
        }
      }
    });
  };

  ////////////CAMBIAR ESTADO/////////
  const cambiar_estado = async (e, id_libro, estado_actual) => {
    e.preventDefault();
    const actualizar = estado_actual == "A" ? "B" : "A";
    const respuesta = await API.ActualizarEstadoLibros(id_libro, {
      actualizar,
    });
    if (respuesta.status) {
      setMensaje(respuesta.mensaje);
      setTimeout(() => {
        setMensaje("");
        API.getLibros().then(setLibros);
      }, 0);
    }
  };
  ////////////////funcion de busqueda////////
  const buscador = (e) => {
    setSearch(e.target.value);
    /* console.log(e.target.value) */
  };
  ////////////////metodo de filtrado////////
  let resul = [];
  if (!search) {
    resul = Libros;
  } else {
    resul = Libros.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Menu />
      <Vigia />

      <div className="contenedorTabla table-responsive">
        <div className="bg-info ">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Agregar Libro
          </button>{" "}
          <br />
        </div>{" "}
        <br />
        <input
          value={search}
          onChange={buscador}
          type="text"
          placeholder="Buscar..."
          className="form-control  bg-info bg-opacity-10 border border-info border-start-0 rounded-end"
        />
        <br />
        <table class="table table-striped table-hover">
          <thead>
            <tr className="bg-info ">
              <td>Título</td>
              <td>Autor-Editorial</td>
              <td>Genero</td>
              <td>Ubicación</td>
              <td>Estado</td>
              <td colSpan="3">Acciones</td>
            </tr>
          </thead>
          <tbody>
            {resul.map((lib) => (
              <tr key={lib.id}>
                <td>{lib.nombre}</td>
                <td>{lib.autor_editorial}</td>
                <td>{lib.generos}</td>
                <td>{lib.ubicacion}</td>
                <td>{lib.estado}</td>
                <td>
                  {lib.estado == "A" ? (
                    <button
                      class="btn btn-danger btn-sm"
                      onClick={(event) =>
                        cambiar_estado(event, lib.id_libro, lib.estado)
                      }
                    >
                      Desactivar
                    </button>
                  ) : (
                    <button
                      class="btn btn-success btn-sm"
                      onClick={(event) =>
                        cambiar_estado(event, lib.id_libro, lib.estado)
                      }
                    >
                      Activar
                    </button>
                  )}
                </td>

                <td>
                  {rol == 1 ? (
                    <button
                      onClick={() => eliminar(lib.id_libro)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  ///////////MODAL////////// */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Agregar libro
              </h1>
            </div>
            <div class="modal-body">
              <AddLibros />
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

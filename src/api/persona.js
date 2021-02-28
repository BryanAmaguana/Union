import { basePath } from "./config";

//obtener los usuarios activos

export function ObtenerPersonaId (token, id) {
    const url = `${basePath}/BuscarPersonaId/${id}`;  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }


  /* Obtener persona por la cedula */

  export function ObtenerPersonaCedula (token, cedula) {
    const url = `${basePath}/ObtenerCedulaPersona/${cedula}`;  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };

    return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });

  }
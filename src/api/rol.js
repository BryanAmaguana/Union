import { basePath } from "./config";


/* Obtener rol por id */
export function ObtenerRolId (token, id) {
    const url = `${basePath}/BuscarRolId/${id}`;  
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

/* Obtener todos los roles */

  export function ObtenerRol (token) {
    const url = `${basePath}/ObtenerRol/`;  
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
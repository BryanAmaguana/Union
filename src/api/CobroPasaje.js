import { basePath } from "./config";


/* Obtener todos los cobros */

export function  ObtenerCobroPasajeTodo(token, desde, limite) {
  const url = `${basePath}/ObtenerCobroPasajeTodo/${desde}/${limite}`;

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

/* Obtener busqueda cobros */

export function  ObtenerCobroPasaje(token, inicio, fin, bus) {
  const url = `${basePath}/ObtenerCobroPasaje/${inicio}/${fin}/${bus}`;

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
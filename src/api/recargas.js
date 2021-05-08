import { basePath } from "./config";


/* Obtener todas las recargas */

export function  ObtenerRecargaTotal(token, desde, limite) {
  const url = `${basePath}/ObtenerRecargaTotal/${desde}/${limite}`;

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

/* Obtener todas las recargas */

export function  ObtenerRecarga(token, desde, limite) {
  const url = `${basePath}/ObtenerRecarga/${desde}/${limite}`;

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

export function  ObtenerRecargaFiltrado(token, inicio, fin, nombre_usuario) {
  const url = `${basePath}/ObtenerRecargaFiltrado/${inicio}/${fin}/${nombre_usuario}`;

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
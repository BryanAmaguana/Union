import { basePath } from "./config";

/*  Obtener Contenido*/

export function ObtenerContenidoApi() {
  const url = `${basePath}/ObtenerContenido`;

  return fetch(url)
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

/* Actualizar Contenido */

export function ActualizarContenidoApi(token, contenidoId, data) {
  const url = `${basePath}/ActualizarContenido/${contenidoId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err;
    });
}

/* Activar Contenido */

export function ActivarContenidoApi(token, contenidoId, status) {
  const url = `${basePath}/ActivarContenido/${contenidoId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ disponible: status })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}


/* agregar Contenido */

export function AgregarContenidoApi(token, contenido) {
  const url = `${basePath}/AddContenido`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(contenido)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

/* Eliminar Contenido */

export function deleteContenidoApi(token, contenidoId) {
  const url = `${basePath}/BorrarContenido/${contenidoId}`;

  const params = {
    method: "DELETE",
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
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}


//actualizar fondo

export function ActualizarFondo(token, fondo, fondoId) {
  const url = `${basePath}/ActualizarFondo/${fondoId}`;
  const formData = new FormData();
  formData.append("fondo", fondo, fondo.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
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

//obtener el url del fondo
export function ObtenerFondo(fondoName) {
  const url = `${basePath}/ObtenerURLFondo/${fondoName}`;

  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}
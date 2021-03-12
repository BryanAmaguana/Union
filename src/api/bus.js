import { basePath } from "./config";


/* Obtener todos los buses paginados */

export function ObtenerBus(token, disponible, desde, limite) {
  const url = `${basePath}/ObtenerBus/${disponible}/${desde}/${limite}`;
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

/* Crear nuevo Bus */
export function CrearBus(token, data) {
  const url = `${basePath}/AgregarBus`;

  const params = {
    method: "POST",
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
      return err.message;
    });
}

/* Activar Bus*/

export function ActivarBus(token, BusId, disponible) {
  const url = `${basePath}/ActivarBuses/${BusId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ disponible: disponible })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err.message;
    });
}

/* Borrar Bus */

export function EliminarBus(token, BusId) {
  const url = `${basePath}/BorrarBus/${BusId}`;

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
      return err.message;
    });
}

//Actualizar Bus

export function ActualizarBus(token, bus, busId) {
  const url = `${basePath}/ActualizarBus/${busId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(bus)
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

 /* Obtener bus por el numero */

 export function ObtenerBusNumero (token, numero_bus, disponible) {
  const url = `${basePath}/BuscarBusNumero/${numero_bus}/${disponible}`;  
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

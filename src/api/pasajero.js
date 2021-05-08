import { basePath } from "./config";

/* Obtener todos los Pasajero paginados */

export function ObtenerPasajero(token, disponible, desde, limite) {
    const url = `${basePath}/ObtenerPasajero/${disponible}/${desde}/${limite}`;
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
  
  /* Crear nuevo Pasajero */
  export function CrearPasajero(token, data) {
    const url = `${basePath}/AgregarPasajero`;
  
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
  
  /* Activar Pasajero*/
  
  export function ActivarPasajero(token, PasajeroId, disponible) {
    const url = `${basePath}/ActivarPasajero/${PasajeroId}`;
  
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
  
  /* Borrar Pasajero */
  
  export function EliminarPasajero(token, PasajeroId) {
    const url = `${basePath}/BorrarPasajero/${PasajeroId}`;
  
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
  
  /* Obtener Pasajero */
  
  export function ActualizarPasajero(token, pasajero, pasajeroId) {
    const url = `${basePath}/ActualizarPasajero/${pasajeroId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(pasajero)
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
  
   /* Obtener pasajero por la cedula */
  
   export function ObtenerCedulaPasajero (token, cedula, disponible) {
    const url = `${basePath}/BuscarPasajeroCedula/${cedula}/${disponible}`;  
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

     /* Obtener pasajero por la cedula */
  
     export function ObtenerCodigoPasajero (token, codigo, disponible) {
      const url = `${basePath}/BuscarPasajeroTarjeta/${codigo}/${disponible}`;  
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
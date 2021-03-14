import { basePath} from "./config";

/* Obtener todas las tarjetas paginadas */

export function ObtenerTipo_Pasajero(token, disponible) {
    const url = `${basePath}/ObtenerTipo_Pasajero/${disponible}`;
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
  
  /* Crear nueva tarjeta */
  export function CrearTipo_Pasajero(token, data) {
    const url = `${basePath}/AgregarTipo_Pasajero`;
  
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
  
  /* Activar Tarjeta*/
  
  export function ActivarTipo_Pasajero(token, TipoId, disponible) {
    const url = `${basePath}/ActivarTipo_Pasajero/${TipoId}`;
  
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

  /* Borrar Tarjeta */

export function EliminarTipo_Pasajero(token, TipoId) {
    const url = `${basePath}/BorrarTipo_Pasajero/${TipoId}`;
  
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
  
  //Actualizar Tarjeta
  
  export function ActualizarTipo_Pasajero(token, tipo, Tipoid) {
    const url = `${basePath}/ActualizarTipo_Pasajero/${Tipoid}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(tipo)
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
  
import { basePath} from "./config";

/* Obtener todas las rutas*/

export function ObtenerRuta(token, disponible) {
    const url = `${basePath}/ObtenerRuta/${disponible}`;
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
  
  /* Crear nueva ruta */
  export function CrearRuta(token, data) {
    const url = `${basePath}/AgregarRuta`;
  
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
  
  /* Activar ruta*/
  
  export function ActivarRuta(token, RutaId, disponible) {
    const url = `${basePath}/ActivarRuta/${RutaId}`;
  
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

  /* Borrar ruta */

export function EliminarRuta(token, RutaId) {
    const url = `${basePath}/BorrarRuta/${RutaId}`;
  
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
  
/*   Actualizar ruta */
  
  export function ActualizarRuta(token, ruta, Rutaid) {
    const url = `${basePath}/ActualizarRuta/${Rutaid}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(ruta)
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

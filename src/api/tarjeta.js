import { basePath} from "./config";

/* Obtener todas las tarjetas paginadas */

export function ObtenerTarjeta(token, disponible, desde, limite) {
    const url = `${basePath}/ObtenerTarjeta/${disponible}/${desde}/${limite}`;
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
  export function CrearTarjeta(token, data) {
    const url = `${basePath}/AgregarTarjeta`;
  
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
  
  export function ActivarTarjeta(token, TarjetaId, disponible) {
    const url = `${basePath}/ActivarTarjeta/${TarjetaId}`;
  
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

export function EliminarTarjeta(token, TarjetaId) {
    const url = `${basePath}/BorrarTarjeta/${TarjetaId}`;
  
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
  
  export function ActualizarTarjeta(token, tarjeta, tarjetaid) {
    const url = `${basePath}/ActualizarTarjeta/${tarjetaid}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(tarjeta)
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
  
   /* Obtener tarjeta por el codigo */
  
   export function ObtenerTarjetaCodigo (token, codigo, disponible) {
    const url = `${basePath}/ObtenerTarjetaCodigo/${codigo}/${disponible}`;  
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
  
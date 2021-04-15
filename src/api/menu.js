import { basePath } from "./config";

/*  Obtener el menu*/

export function ObtenerMenuApi() {
    const url = `${basePath}/ObtenerMenu`;

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

/* Actualizar Menu */

  export function ActualizarMenuApi(token, menuId, data) {
    const url = `${basePath}/ActualizarMenu/${menuId}`;
  
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

  /* Activar menu */

  export function ActivarMenuApi(token, menuId, status) {
    const url = `${basePath}/ActivarMenu/${menuId}`;
  
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


/* agregar menu */

export function AgregarMenuApi(token, menu) {
    const url = `${basePath}/AddMenu`;
  
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(menu)
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

  /* Eliminar menu */

  export function deleteMenuApi(token, menuId) {
    const url = `${basePath}/BorrarMenu/${menuId}`;
  
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
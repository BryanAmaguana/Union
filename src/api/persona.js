import { basePath } from "./config";


/* Obtener todas las personas paginadas */

export function  ObtenerPersona(token, desde, limite) {
  const url = `${basePath}/ObtenerPersonas/${desde}/${limite}`;

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


//obtener los usuarios activos

export function ObtenerPersonaId (token, id) {
    const url = `${basePath}/BuscarPersonaId/${id}`;  
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


  /* Obtener persona por la cedula */

  export function ObtenerPersonaCedula (token, cedula) {
    const url = `${basePath}/ObtenerCedulaPersona/${cedula}`;  
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

  /* Crear nueva persona */
export function CrearPersona(token, data) {
  const url = `${basePath}/AgregarPersona`;

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

/* Obtner persona por la cedula */
export function  BuscarPersonaCedula(token, cedula_persona) {
  const url = `${basePath}/BuscarPersonaCedula/${cedula_persona}`;

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

export function ActualizarPersona(token, persona, personaId) {
  const url = `${basePath}/ActualizarPersona/${personaId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(persona)
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

/* Borrar Persona */

export function EliminarPersona(token, personaId) {
  const url = `${basePath}/BorrarPersona/${personaId}`;

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
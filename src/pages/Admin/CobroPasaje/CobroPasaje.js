import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerCobroPasajeTodo} from "../../../api/CobroPasaje"
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import ListCobroPasaje from "../../../components/Admin/Cobro_Pasaje/ListCobroPasaje";

import "./CobroPasaje.scss";

export default function CobroPasaje() {
    const [reloadCobro , setReloadCobro] = useState(false);
    const [cobro, setcobro] = useState([]);
    const token = getAccessTokenApi(); 
    const [contenido, setContendio] = useState([]);

    useEffect(() => {    
        ObtenerCobroPasajeTodo(token, 0, 4).then(response => {
          setcobro(response.cobro);
        });
        ObtenerContenidoApi().then(response => {
          if (response.contenido) {
              setContendio(response.contenido);
          }
      });
        setReloadCobro(false);
      }, [token , reloadCobro]);
      

  return (
    <div className="cobro">
          <ListCobroPasaje cobro={cobro} setcobro={setcobro} setReloadCobro={setReloadCobro} contenido={contenido} />
    </div>
  );
}
import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { ObtenerTipo_Pasajero } from "../../../api/tipo_pasajero";
import ListTP from "../../../components/Admin/Tipo_Pasajero/ListTipo_Pasajero";

import "./Tipo_pasajero.scss";

export default function Tipo_Pasajero() {
  const [TipoActivos, setTipoActivos] = useState([]);
  const [TipoInactivos, setTipoInactivos] = useState([]);
  const [reloadTipo , setReloadTipo] = useState(false);
  const token = getAccessTokenApi(); 

  useEffect(() => {

    ObtenerTipo_Pasajero(token, true).then(response => {
      setTipoActivos(response.tipo);
    });
    ObtenerTipo_Pasajero(token, false).then(response => {
      setTipoInactivos(response.tipo);
    });
    setReloadTipo(false);
  }, [token , reloadTipo]);

  return (
    <div className="tipo">
      <ListTP TipoActivos={TipoActivos} TipoInactivos ={TipoInactivos} setReloadTipo={setReloadTipo}/>
    </div>
  );
}
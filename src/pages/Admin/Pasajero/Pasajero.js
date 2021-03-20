import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerPasajero} from "../../../api/pasajero"
import ListPasajero from "../../../components/Admin/Pasajero/ListPasajero";
import { ObtenerTipo_Pasajero } from "../../../api/tipo_pasajero"

import "./Pasajero.scss";

export default function Pasajero() {
    const [reloadPasajero , setReloadPasajero] = useState(false);
    const [PasajeroActivos, setPasajeroActivos] = useState([]);
    const [PasajeroInactivos, setPasajeroInactivos] = useState([]);
    const [Tipo_Pasajero, setTipoPasajero] = useState({});
    const token = getAccessTokenApi(); 

    useEffect(() => {    
        ObtenerPasajero(token, true, 0, 3).then(response => {
            setPasajeroActivos(response.pasajero);
          });

          ObtenerPasajero(token, false, 0, 3).then(response => {
            setPasajeroInactivos(response.pasajero);
          });

          ObtenerTipo_Pasajero(token, true).then(response => {
            setTipoPasajero(response.tipo);
          });

          setReloadPasajero(false);
        }, [token , reloadPasajero]);

  return (
    <div className="pasajero">
           <ListPasajero 
           PasajeroActivos={PasajeroActivos} 
           PasajeroInactivos ={PasajeroInactivos} 
           setReloadPasajero={setReloadPasajero} 
           setPasajeroActivos={setPasajeroActivos} 
           setPasajeroInactivos={setPasajeroInactivos} 
           Tipo_Pasajero={Tipo_Pasajero}/>
    </div>
  );
}
import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { ObtenerTarjeta } from "../../../api/tarjeta";
import ListTarjeta from "../../../components/Admin/Tarjeta/ListTarjeta";

import "./Tarjeta.scss";

export default function Tarjeta() {
  const [TarjetaActivos, setTarjetaActivos] = useState([]);
  const [TarjetaInactivos, setTarjetaInactivos] = useState([]);
  const [reloadTarjeta , setReloadTarjeta] = useState(false);
  const token = getAccessTokenApi(); 

  useEffect(() => {

    ObtenerTarjeta(token, true, 0, 6).then(response => {
      setTarjetaActivos(response.tarjeta);
    });
    ObtenerTarjeta(token, false, 0, 6).then(response => {
      setTarjetaInactivos(response.tarjeta);
    });
    setReloadTarjeta(false);
  }, [token , reloadTarjeta]);

  return (
    <div className="tarjeta">
      <ListTarjeta TarjetaActivos={TarjetaActivos} TarjetaInactivos ={TarjetaInactivos} setReloadTarjeta={setReloadTarjeta} setTarjetaActivos={setTarjetaActivos} setTarjetaInactivos={setTarjetaInactivos}/>
    </div>
  );
}
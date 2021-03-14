import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { ObtenerRuta } from "../../../api/ruta";
import ListRuta from "../../../components/Admin/Ruta/ListRuta";

import "./Ruta.scss";

export default function Ruta() {
  const [RutaActivos, setRutaActivos] = useState([]);
  const [RutaInactivos, setRutaInactivos] = useState([]);
  const [reloadRuta , setReloadRuta] = useState(false);
  const token = getAccessTokenApi(); 

  useEffect(() => {

    ObtenerRuta(token, true).then(response => {
      setRutaActivos(response.ruta);
    });
    ObtenerRuta(token, false).then(response => {
      setRutaInactivos(response.ruta);
    });
    setReloadRuta(false);

  }, [token , reloadRuta]);

  return (
    <div className="ruta">
      <ListRuta RutaActivos={RutaActivos} RutaInactivos ={RutaInactivos} setReloadRuta={setReloadRuta}/>
    </div>
  );
}
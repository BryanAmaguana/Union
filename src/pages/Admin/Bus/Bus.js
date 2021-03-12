import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerBus} from "../../../api/bus"
import ListBus from "../../../components/Admin/Bus/ListBus";

import "./Bus.scss";

export default function Bus() {
    const [BusActivos, setBusActivos] = useState([]);
    const [BusInactivos, setBusInactivos] = useState([]);
    const [reloadBus , setReloadBus] = useState(false);
    const token = getAccessTokenApi(); 
  
    useEffect(() => {
  
      ObtenerBus(token, true, 0, 4).then(response => {
        setBusActivos(response.bus);
      });
      ObtenerBus(token, false, 0, 4).then(response => {
        setBusInactivos(response.bus);
      });
      setReloadBus(false);
    }, [token , reloadBus]);
  
    return (
      <div className="users">
        <ListBus BusActivo={BusActivos} BusInactivo ={BusInactivos} setReloadBus={setReloadBus} setBusActivos={setBusActivos} setBusInactivos={setBusInactivos}/>
      </div>
    );
  }
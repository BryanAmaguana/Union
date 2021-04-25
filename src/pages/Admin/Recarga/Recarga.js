import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerRecarga} from "../../../api/recargas";
import ListRecarga from "../../../components/Admin/Recarga/ListRecarga";

import "./Recarga.scss";

export default function Recarga() {
    const [reloadRecarga , setReloadRecarga] = useState(false);
    const [recarga, setrecarga] = useState([]);
    const token = getAccessTokenApi(); 

    useEffect(() => {    
        ObtenerRecarga(token, 0, 5).then(response => {
          setrecarga(response.recarga);
        });
        setReloadRecarga(false);
    
      }, [token , reloadRecarga]);

  return (
    <div className="cobro">
          <ListRecarga recarga={recarga} setrecarga={setrecarga} setReloadRecarga={setReloadRecarga} />
    </div>
  );
}
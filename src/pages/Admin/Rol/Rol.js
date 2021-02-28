import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerRol} from "../../../api/rol"
import ListRol from "../../../components/Admin/Rol/ListRol";

import "./Rol.scss";

export default function Rol() {
    const [reloadUsers , setReloadRol] = useState(false);
    const [rol, setRol] = useState([]);
    const token = getAccessTokenApi(); 

    useEffect(() => {    
        ObtenerRol(token).then(response => {
          setRol(response.rol);
        });
        setReloadRol(false);
    
      }, [token , reloadUsers]);

  return (
    <div className="rol">
      <ListRol rol = {rol} setReloadRol={setReloadRol}/>
    </div>
  );
}
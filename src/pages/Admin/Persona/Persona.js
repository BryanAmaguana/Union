import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import {ObtenerPersona} from "../../../api/persona"
import ListPersona from "../../../components/Admin/Persona/ListPersona";

import "./Persona.scss";

export default function Rol() {
    const [reloadPersona , setReloadPersona] = useState(false);
    const [persona, setpersona] = useState([]);
    const token = getAccessTokenApi(); 

    useEffect(() => {    
        ObtenerPersona(token, 0, 4).then(response => {
          setpersona(response.persona);
        });
        setReloadPersona(false);
    
      }, [token , reloadPersona]);

  return (
    <div className="persona">
          <ListPersona persona={persona} setpersona={setpersona} setReloadPersona={setReloadPersona} />
    </div>
  );
}
import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { ObtenerUsuariosAI } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import {ObtenerRol} from "../../../api/rol"

import "./Users.scss";

export default function Users() {
  const [UsuariosActivos, setusuariosActivos] = useState([]);
  const [UsuariosInactivos, setusuariosInactivos] = useState([]);
  const [reloadUsers , setReloadUsers] = useState(false);
  const [rol, setRol] = useState([]);
  const token = getAccessTokenApi(); 

  useEffect(() => {

    ObtenerUsuariosAI(token, true, 0, 4).then(response => {
      setusuariosActivos(response.usuario);
    });
    ObtenerUsuariosAI(token, false, 0, 4).then(response => {
      setusuariosInactivos(response.usuario);
    });

    ObtenerRol(token).then(response => {
      setRol(response.rol);
    });

    setReloadUsers(false);


  }, [token , reloadUsers]);

  return (
    <div className="users">
      <ListUsers usuarioActivo={UsuariosActivos} usuarioInactivo ={UsuariosInactivos} rol = {rol} setReloadUsers={setReloadUsers} setusuariosActivos={setusuariosActivos} setusuariosInactivos={setusuariosInactivos}/>
    </div>
  );
}
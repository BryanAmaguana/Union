import React, {useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import ListContenidoWeb from "../../../components/Admin/ContenidoWeb/ListContenidoWeb";

import "./ContenidoWeb.scss";

export default function ContenidoWeb() {
  const [contenidoWeb, setContenidoWeb] = useState([]);
  const [reloadContenidoWeb , setReloadContenidoWeb] = useState(false);
  const token = getAccessTokenApi(); 

  useEffect(() => {
    ObtenerContenidoApi().then(response => {
      setContenidoWeb(response.contenido[0]);
    });
    setReloadContenidoWeb(false);
  }, [token , reloadContenidoWeb]);

  return (
    <div className="contenido">
      <ListContenidoWeb contenido={contenidoWeb} setReloadContenidoWeb={setReloadContenidoWeb} />
    </div>
  );
}
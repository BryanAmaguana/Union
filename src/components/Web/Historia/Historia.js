import React, { useState, useEffect } from "react";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import "./Historia.scss";

export default function Historia() {

   const [ContenidoInformacion, setContenidoInformacion] = useState({});
   const [reloadHistoria, setReloadHistoria] = useState(false);

   useEffect(() => {
      ObtenerContenidoApi()
         .then(response => {
            setContenidoInformacion(response.contenido[0])
         });
      setReloadHistoria(false);
   }, [reloadHistoria]);

   return (
      <section id="Historia">
         <div className="Parrafo">
            <div className="row">
               <br />
               <br />
               <br />
               <h1>Como Inicio la Cooperativa</h1>
               <p> {ContenidoInformacion.historia} </p>
            </div>
         </div>
      </section>
   );
}
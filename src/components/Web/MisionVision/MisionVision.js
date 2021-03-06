import React, { useState, useEffect } from "react";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";

import "./MisionVision.scss";

export default function MisionVision() {
   const [ContenidoInformacion, setContenidoInformacion] = useState({});
   const [reloadMision , setReloadMision] = useState(false);

   useEffect(() => {
      ObtenerContenidoApi()
         .then(response => {
            setContenidoInformacion(response.contenido[0])
         });
         setReloadMision(false);
   }, [reloadMision]);

   return (
      <section id="MisionVision">

         <div className="row education">
         
            <div className="centrar">
               <h4><b><span>Misión</span></b></h4>
            </div>

            <div>
               <div className="row item">
                  <div className="twelve columns">
                     <h1> {ContenidoInformacion.mision} </h1>
                  </div>
               </div>
            </div>
         </div>

         <div className="row work">

            <div className="three columns header-col">
               <h4><b><span>Visión</span></b></h4>
            </div>

            <div >
               <h1>{ContenidoInformacion.vision} </h1>
            </div>
         </div>
      </section>
   );
}
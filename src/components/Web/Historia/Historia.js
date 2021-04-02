import React, { useState, useEffect } from "react";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import { notification } from "antd";
import "./Historia.scss";

export default function Historia() {

   const [ContenidoInformacion, setContenidoInformacion] = useState({});

   useEffect(() => {
      ObtenerContenidoApi()
         .then(response => {
            setContenidoInformacion(response.contenido[0])
         })
         .catch(err => {
            notification["error"]({
               message: err
            });
         });

   }, []);

   return (
      <section id="Historia">
         <div className="text-container">
            <div className="row">
               <h1>Como Inicio la Cooperativa</h1>
               <div className="ten columns flex-container">
                  <h2> {ContenidoInformacion.historia} </h2>
               </div>
            </div>
         </div>
      </section>
   );
}
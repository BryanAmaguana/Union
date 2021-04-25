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
         <div className="Parrafo">
            <div className="row">
               <br/>
               <br/>
               <br/>
               <h1>Como Inicio la Cooperativa</h1>
                  <p> {ContenidoInformacion.historia} </p>
            </div>
         </div>
      </section>
   );
}
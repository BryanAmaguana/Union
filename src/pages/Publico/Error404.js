import React from 'react';
import "./Error404.scss";

export default function Error404(){
    return(
        <div className="baseError">
            <h1 className="h1Error"><a href={`/`}>404</a></h1>
            <h2 className="h2Error"><a href={`/`}>Pagina no encontrada</a></h2>
            <div><a href={`/`}>Volver a la pagina de inicio</a></div>
            </div>
    );
}
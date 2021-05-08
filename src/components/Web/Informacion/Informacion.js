import React, { useState, useEffect } from "react";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import { Form} from "antd";
import Logo from '../../../assets/img/png/UnionIcono.png';

import "./Informacion.scss";

export default function MisionVision() {
    const [ContenidoInformacion, setContenidoInformacion] = useState({});
    const [reloadInformacion, setReloadInformacion] = useState(false);

    useEffect(() => {
        ObtenerContenidoApi()
            .then(response => {
                setContenidoInformacion(response.contenido[0])
            });
        setReloadInformacion(false);
    }, [reloadInformacion]);

    return (
        <Form id="Informacion" >
            <div className="col-6 col-s-9">
                <div className="Letras">Acerca de Nosotros</div>
                <div className="LetrasDescripcion2">{ContenidoInformacion.descripcion}</div>
                <br />
                <div className="Letras2">Contactos</div>
                <div className="LetrasDescripcion2"> <b>{ContenidoInformacion.nombre}</b></div>
                <div>  <b>Direccion :</b> Ambato  {ContenidoInformacion.direccion} </div>
                <div className="LetrasDescripcion2"> <b>Teléfono :</b> {ContenidoInformacion.telefono}</div>
                <div className="LetrasDescripcion2"> <b>Cedular :</b> {ContenidoInformacion.Celular}</div>
                <div className="LetrasDescripcion2"> <b>Fax :</b> {ContenidoInformacion.fax}</div>
                <div className="LetrasDescripcion2"> <b>Correo :</b> {ContenidoInformacion.correo}</div><br />
            </div>
            <div className="col-3 col-s-12">
                <div className="aside">
                    <img className="profile-pic" src={Logo} alt="Union" />
                </div>
            </div>


        </Form>
    );
}
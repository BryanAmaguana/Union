import React, { useState, useEffect } from "react";
import MenuTop from "../../../components/Web/MenuTop";
import Logo from '../../../assets/img/png/UnionIcono.png';
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import { notification } from "antd";
import "./inicio.scss";

export default function Inicio() {
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
        <header className="headerIninio">

            <nav id="nav-wrap">
                <ul id="nav" className="nav">
                    <MenuTop />
                </ul>
            </nav>

            <div className="row banner">
                <div className="banner-text">
                    <h1 className="logoIconoPrincipal">
                        <img src={Logo} alt="Union" />
                    </h1>

                        <h1 >{ContenidoInformacion.nombre}</h1>
                        <br />

                        <h3>{ContenidoInformacion.mensaje_Inicio}</h3>
                        <hr />
                        <ul className="social">
                            {ContenidoInformacion.mensaje_Inicio2}
                        </ul>

                </div>
            </div>

        </header>
    );
}
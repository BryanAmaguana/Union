import React, { useState, useEffect } from "react";
import { ObtenerContenidoApi } from "../../../api/contenidoWeb";
import { Form, Row, Col, notification } from "antd";
import Logo from '../../../assets/img/png/UnionIcono.png';

import "./Informacion.scss";

export default function MisionVision() {
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

        <Form id="Informacion" >
            <Row gutter={24}>
                <Col span={15} ><br /></Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <div className="CentradoInagen" >
                            <div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <img className="profile-pic" src={Logo} alt="Union" />
                            </div>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item>
                        <div className="ContenidoI">
                            <div className="Letras">Acerca de Nosotros</div>
                            <div className="LetrasDescripcion2">{ContenidoInformacion.descripcion}</div>
                            <br />
                            <div className="row">
                                <div className="columns contact-details">
                                    <div className="Letras2">Contactos</div>
                                    <div className="LetrasDescripcion2"> <b>{ContenidoInformacion.nombre}</b></div>
                                    <div>  <b>Direccion :</b> Ambato  {ContenidoInformacion.direccion} </div>
                                    <div className="LetrasDescripcion2"> <b>Teléfono :</b> {ContenidoInformacion.telefono}</div>
                                    <div className="LetrasDescripcion2"> <b>Cedular :</b> {ContenidoInformacion.Celular}</div>
                                    <div className="LetrasDescripcion2"> <b>Fax :</b> {ContenidoInformacion.fax}</div>
                                    <div className="LetrasDescripcion2"> <b>Correo :</b> {ContenidoInformacion.correo}</div><br />

                                </div>
                            </div>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
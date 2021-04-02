import React, { useState, useEffect } from "react";
import { Button, notification, Form, Input, Row, Col } from "antd";
import { ContactsOutlined, MailOutlined, NodeIndexOutlined, PhoneOutlined, VerticalAlignBottomOutlined, ShakeOutlined } from '@ant-design/icons';
import { ActualizarContenidoApi } from "../../../../api/contenidoWeb";
import { getAccessTokenApi } from "../../../../api/auth";
import TextareaAutosize from 'react-autosize-textarea';

import "./ListContenidoWeb.scss";

export default function ListContenidoWeb(props) {
    const { contenido, setReloadContenidoWeb } = props;
    const [FondoData, setFondoData] = useState({});

    useEffect(() => {
        setFondoData({
            nombre: contenido.nombre,
            correo: contenido.correo,
            direccion: contenido.direccion,
            telefono: contenido.telefono,
            Celular: contenido.Celular,
            fax: contenido.fax,
            mensaje_Inicio: contenido.mensaje_Inicio,
            mensaje_Inicio2: contenido.mensaje_Inicio2,
            descripcion: contenido.descripcion,
            mision: contenido.mision,
            vision: contenido.vision,
            historia: contenido.historia
        });
        // eslint-disable-next-line
    }, [contenido]);

    const updateContenido = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let FondoActualizado = FondoData;
        ActualizarContenidoApi(token, contenido._id, FondoActualizado).then(result => {
            if (result === "Contenido Web Actualizado correctamente.") {
                setReloadContenidoWeb(true);
            }
            notification["info"]({
                message: result
            });
            setReloadContenidoWeb(true);
        });
    };

    return (
        <div className="edit-contenido-form">
            <EditForm
                contenido={FondoData}
                setFondoData={setFondoData}
                updateContenido={updateContenido} />
        </div>
    );
}

function EditForm(props) {
    const { contenido, setFondoData, updateContenido } = props;

    return (
        <Form className="form-edit" onSubmitCapture={updateContenido}>
            <Row gutter={24}>
                <Col span={8} ><br /></Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item>
                        <span>Cooperativa</span>
                        <Input
                            prefix={<ContactsOutlined />}
                            placeholder={'Nombre'}
                            value={ contenido.nombre}
                            onChange={e =>
                                setFondoData({ ...contenido, nombre: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <span>Correo</span>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Correo"
                            value={contenido.correo}
                            onChange={e =>
                                setFondoData({ ...contenido, correo: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <span>Dirección</span>
                        <Input
                            prefix={<NodeIndexOutlined />}
                            placeholder="Direción"
                            value={contenido.direccion}
                            onChange={e =>
                                setFondoData({ ...contenido, direccion: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={8} ><br /> <br /></Col>
            </Row>

            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item>
                        <span>Teléfono</span>
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Teléfono"
                            value={contenido.telefono}
                            onChange={e =>
                                setFondoData({ ...contenido, telefono: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <span>Celular</span>
                        <Input
                            prefix={<ShakeOutlined />}
                            placeholder="Celular"
                            value={contenido.Celular}
                            onChange={e =>
                                setFondoData({ ...contenido, Celular: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <span>Fax</span>
                        <Input
                            prefix={<VerticalAlignBottomOutlined />}
                            placeholder="Fax"
                            value={contenido.fax}
                            onChange={e =>
                                setFondoData({ ...contenido, fax: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>


            <Row gutter={24}>
                <Col span={8} ><br /> <br /></Col>
            </Row>

            <Row gutter={24}>
                <Col span={8} >
                    <span>Mensaje de Inicio</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Mensaje de Inicio"
                            value={ contenido.mensaje_Inicio }
                            rows={7}
                            onChange={e =>
                                setFondoData({ ...contenido, mensaje_Inicio: e.target.value })
                            } />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <span>Mensaje Secundario</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Segundo Mensaje"
                            value={contenido.mensaje_Inicio2}
                            rows={7}
                            onChange={e =>
                                setFondoData({ ...contenido, mensaje_Inicio2: e.target.value })
                            } />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <span>Descripción</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Descripción"
                            value={contenido.descripcion}
                            rows={7}
                            onChange={e =>
                                setFondoData({ ...contenido, descripcion: e.target.value })
                            } />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={8} ><br /> <br /></Col>
            </Row>

            <Row gutter={24}>
                <Col span={8} >
                    <span>Misión</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Misión"
                            value={contenido.mision}
                            rows={7}
                            onChange={e =>
                                setFondoData({ ...contenido, mision: e.target.value })
                            } />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <span>Visión</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Visión"
                            value={contenido.vision}
                            rows={7} 
                            onChange={e =>
                                setFondoData({ ...contenido, vision: e.target.value })
                            } />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <span>Historia</span>
                    <Form.Item>
                        <TextareaAutosize className="textoG"
                            placeholder="Historia"
                            value={contenido.historia}
                            rows={7}
                            onChange={e =>
                                setFondoData({ ...contenido, historia: e.target.value })
                            } />
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Contenido
                </Button>
            </Form.Item>
        </Form>
    );
}


import React, { useState, useEffect } from "react";
import { Button, notification, Form, Input } from "antd";
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
            <div className="navbarCont">
                <div className="BuscadorCont" >
                    <span>Cooperativa</span>
                    <Input
                        prefix={<ContactsOutlined />}
                        placeholder={'Nombre'}
                        value={contenido.nombre}
                        maxLength="55"
                        onChange={e =>
                            setFondoData({ ...contenido, nombre: e.target.value })
                        }
                    />
                </div>
                <div className="BuscadorCont" >
                    <span>Correo</span>
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Correo"
                        value={contenido.correo}
                        onChange={e =>
                            setFondoData({ ...contenido, correo: e.target.value })
                        }
                    />
                </div>
                <div className="BuscadorCont" >
                    <span>Dirección</span>
                    <Input
                        prefix={<NodeIndexOutlined />}
                        placeholder="Direción"
                        value={contenido.direccion}
                        onChange={e =>
                            setFondoData({ ...contenido, direccion: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="navbarCont">
                <div className="BuscadorCont" >
                    <span>Teléfono</span>
                    <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Teléfono"
                        value={contenido.telefono}
                        onChange={e =>
                            setFondoData({ ...contenido, telefono: e.target.value })
                        }
                    />
                </div>
                <div className="BuscadorCont" >
                    <span>Celular</span>
                    <Input
                        prefix={<ShakeOutlined />}
                        placeholder="Celular"
                        value={contenido.Celular}
                        onChange={e =>
                            setFondoData({ ...contenido, Celular: e.target.value })
                        }
                    />
                </div>
                <div className="BuscadorCont" >
                    <span>Fax</span>
                    <Input
                        prefix={<VerticalAlignBottomOutlined />}
                        placeholder="Fax"
                        value={contenido.fax}
                        onChange={e =>
                            setFondoData({ ...contenido, fax: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="navbarCont">
                <div className="BuscadorCont" >
                    <span>Mensaje de Inicio</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Mensaje de Inicio"
                        value={contenido.mensaje_Inicio}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, mensaje_Inicio: e.target.value })
                        } />
                </div>
                <div className="BuscadorCont" >
                    <span>Mensaje Secundario</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Segundo Mensaje"
                        value={contenido.mensaje_Inicio2}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, mensaje_Inicio2: e.target.value })
                        } />
                </div>
                <div className="BuscadorCont" >
                    <span>Descripción</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Descripción"
                        value={contenido.descripcion}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, descripcion: e.target.value })
                        } />
                </div>
            </div>



            <div className="navbarCont">
                <div className="Buscador1Cont" >
                    <span>Misión</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Misión"
                        value={contenido.mision}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, mision: e.target.value })
                        } />
                </div>
            </div>
            <div className="navbarCont">
                <div className="Buscador1Cont" >
                    <span>Visión</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Visión"
                        value={contenido.vision}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, vision: e.target.value })
                        } />
                </div>
            </div>
            <div className="navbarCont">
                <div className="Buscador1Cont" >
                    <span>Historia</span>
                    <TextareaAutosize className="textoGCont"
                        placeholder="Historia"
                        value={contenido.historia}
                        rows={7}
                        onChange={e =>
                            setFondoData({ ...contenido, historia: e.target.value })
                        } />
                </div>
            </div>

            <Form.Item>
            <div className="Buscador1Cont">
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Contenido
                </Button>
                </div>
            </Form.Item>
        </Form >
    );
}


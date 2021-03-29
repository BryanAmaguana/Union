import React, { useState } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { AgregarContenidoApi } from "../../../../api/contenidoWeb";
import { getAccessTokenApi } from "../../../../api/auth";
import { TagOutlined, PicCenterOutlined } from '@ant-design/icons';

import "./AddContenidoWeb.scss";

export default function AddContenidoForm(props) {
    const { setIsVisibleModal, setReloadContenidoWeb } = props;
    const [contenidoData, setContenidoData] = useState({});

    const addContenido = event => {
        event.preventDefault();
        if (
            !contenidoData.titulo ||
            !contenidoData.con
        ) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else {
            const accesToken = getAccessTokenApi();
            contenidoData.disponible = true;
            contenidoData.order = 1000;

            AgregarContenidoApi(accesToken, contenidoData)
                .then(response => {
                    if (response === "Contenido Web creado correctamente.") {
                        notification["success"]({
                            message: response
                        });
                        setContenidoData({});
                        setIsVisibleModal(false);
                        setReloadContenidoWeb(true);
                    } else {
                        notification["error"]({
                            message: response
                        });
                    }
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    };

    return (
        <div className="add-contenido-form">
            <AddForm
                contenidoData={contenidoData}
                setContenidoData={setContenidoData}
                addContenido={addContenido}
                setReloadContenidoWeb={setReloadContenidoWeb}
            />
        </div>
    );
}

function AddForm(props) {
    const { contenidoData, setContenidoData, addContenido } = props;

    return (

        <Form className="form-edit" onSubmitCapture={addContenido}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={<TagOutlined />}
                            placeholder="Titulo"
                            value={contenidoData.titulo}
                            onChange={e =>
                                setContenidoData({ ...contenidoData, titulo: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <textarea
                            prefix={<PicCenterOutlined />}
                            placeholder="Contenido"
                            value={contenidoData.con}
                            rows="10" 
                            cols="64"
                            onChange={e =>
                                setContenidoData({ ...contenidoData, con: e.target.value })
                            } />

{/*                         <Input
                            prefix={<PicCenterOutlined />}
                            placeholder="Contenido"
                            multiple="multiple"
                            value={contenidoData.con}
                            onChange={e =>
                                setContenidoData({ ...contenidoData, con: e.target.value })
                            }
                        /> */}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Agregar Contenido
                </Button>
            </Form.Item>
        </Form>
    );
}
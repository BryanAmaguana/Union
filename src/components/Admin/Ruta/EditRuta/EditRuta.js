import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { FieldNumberOutlined, ProfileOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ActualizarRuta } from "../../../../api/ruta"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditRuta.scss"

export default function EditRutaForm(props) {
    const { ruta, setIsVisibleModal, setReloadRuta } = props;
    const [RutaData, setRutaData] = useState({});

    useEffect(() => {
        setRutaData({
            numero_ruta: ruta.numero_ruta,
            nombre_ruta: ruta.nombre_ruta,
            descripcion: ruta.descripcion,
        });
    }, [ruta]);

    const updateRuta = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let RutaActualizada = RutaData;

        if (!RutaActualizada.numero_ruta || !RutaActualizada.nombre_ruta || !RutaActualizada.descripcion) {
            notification["error"]({
                message: "Código, Valor y Descripción son Obligatorios."
            });
        }else{
            ActualizarRuta(token, RutaActualizada, ruta._id).then(result => {
                if (result.message === "Ruta actualizada correctamente.") {
                    setIsVisibleModal(false);
                    setReloadRuta(true);
                }
                notification["info"]({
                    message: result.message
                });
                setReloadRuta(true);
            });
        }
    };

    return (
        <div className="edit-ruta-form">
            <EditForm
                RutaData={RutaData}
                setRutaData={setRutaData}
                updateRuta={updateRuta} />
        </div>
    );
}

function EditForm(props) {
    const { RutaData, setRutaData, updateRuta } = props;

    return (
        <Form className="form-edit" onSubmitCapture={updateRuta}>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<FieldNumberOutlined />}
                            placeholder="Número Ruta"
                            type="number"
                            min="0"
                            value={RutaData.numero_ruta}
                            onChange={e =>
                                setRutaData({ ...RutaData, numero_ruta: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<ProfileOutlined />}
                            placeholder="Nombre Ruta"
                            value={RutaData.nombre_ruta}
                            onChange={e =>
                                setRutaData({ ...RutaData, nombre_ruta: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={<InfoCircleOutlined />}
                            placeholder="Descripción"
                            value={RutaData.descripcion}
                            onChange={e =>
                                setRutaData({ ...RutaData, descripcion: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Ruta
  </Button>
            </Form.Item>
        </Form>
    );
}

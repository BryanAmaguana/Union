import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification, Select } from "antd";
import { CreditCardOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { ActualizarTarjeta } from "../../../../api/tarjeta"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditTarjeta.scss"

export default function EditTarjetaForm(props) {
    const { tarjeta, setIsVisibleModal, setReloadTarjeta, Tipo_Pasajero } = props;
    const [tarjetaData, setTarjetaData] = useState({});

    useEffect(() => {
        setTarjetaData({
            codigo: tarjeta.codigo,
            valor_tarjeta: tarjeta.valor_tarjeta,
            descripcion: tarjeta.descripcion._id,
        });
    }, [tarjeta]);

    const updateTarjeta = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let TarjetaActualizada = tarjetaData;

        if (!TarjetaActualizada.codigo || !TarjetaActualizada.valor_tarjeta || !TarjetaActualizada.descripcion) {
            notification["error"]({
                message: "Código, Valor y Descripción son Obligatorios."
            });
            return;
        }

        ActualizarTarjeta(token, TarjetaActualizada, tarjeta._id).then(result => {
            if (result.message === "Tarjeta actualizada correctamente.") {
                setIsVisibleModal(false);
                setReloadTarjeta(true);
            }
            notification["info"]({
                message: result.message
            });
            setReloadTarjeta(true);
        });

    };
    return (
        <div className="edit-tarjeta-form">
            <EditForm
                tarjetaData={tarjetaData}
                setTarjetaData={setTarjetaData}
                updateTarjeta={updateTarjeta}
                Tipo_Pasajero={Tipo_Pasajero} />
        </div>
    );
}

function EditForm(props) {
    const { tarjetaData, setTarjetaData, updateTarjeta, Tipo_Pasajero } = props;
    const { Option } = Select;
    return (
        <Form className="form-edit" onSubmitCapture={updateTarjeta}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<CreditCardOutlined />}
                            placeholder="Código"
                            value={tarjetaData.codigo}
                            onChange={e =>
                                setTarjetaData({ ...tarjetaData, codigo: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<DollarCircleOutlined />}
                            placeholder="Valor 00.00"
                            type="number"
                            min="0"
                            step="0.01"
                            value={tarjetaData.valor_tarjeta}
                            onChange={e =>
                                setTarjetaData({ ...tarjetaData, valor_tarjeta: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccione tipo de Tarjeta"
                            value={tarjetaData.descripcion}
                            onChange={e =>
                                setTarjetaData({ ...tarjetaData, descripcion: e })
                            }
                            
                        >
                            {Tipo_Pasajero.map((item) => {
                                return <Option key={item._id.toString()} value={`${item._id}`}> {item.nombre} </Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Tarjeta
                </Button>
            </Form.Item>
        </Form>
    );
}

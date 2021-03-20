import React, { useState } from "react";
import { Form, Input, Button, Row, Col, notification, Select } from "antd";
import { CrearPasajero } from "../../../../api/pasajero";
import { getAccessTokenApi } from "../../../../api/auth";
import { UserAddOutlined, ContactsOutlined, DollarCircleOutlined, InfoCircleOutlined, CreditCardOutlined  } from '@ant-design/icons';
import { ObtenerPersonaCedula } from "../../../../api/persona";
import { ObtenerTarjetaCodigoP } from "../../../../api/tarjeta"


import "./AddPasajer.scss";

export default function AddPasajeroForm(props) {
    const { setIsVisibleModal, setReloadPasajero, Tipo_Pasajero } = props;
    const [pasajeroData, setPasajeroData] = useState({});
    const [persona, setPersona] = useState({});
    const [tarjeta, setTarjeta] = useState({});


    const addPasajero = event => { 
        event.preventDefault();
        pasajeroData.id_persona = persona._id;
        pasajeroData.id_tarjeta_pasajero = tarjeta._id;
        pasajeroData.cedula_persona = persona.cedula_persona;
        if (
            !pasajeroData.id_persona ||
            !pasajeroData.cedula_persona ||
            !pasajeroData.id_tarjeta_pasajero ||
            !pasajeroData.id_tipo_pasajero
        ) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });

        } else {
            const accesToken = getAccessTokenApi();
            CrearPasajero(accesToken, pasajeroData)
                .then(response => {
                    if (response === "Pasajero creado exitosamente.") {
                        notification["success"]({
                            message: response
                        });
                        setPasajeroData({});
                        setPersona({});
                        setTarjeta({});
                        setIsVisibleModal(false);
                        setReloadPasajero(true);
                    } else {
                        notification["info"]({
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
        <div className="add-pasajero-form">
            <AddForm
                pasajeroData={pasajeroData}
                setPasajeroData={setPasajeroData}
                persona={persona}
                setPersona={setPersona}
                tarjeta={tarjeta}
                setTarjeta={setTarjeta}
                addPasajero={addPasajero}
                Tipo_Pasajero={Tipo_Pasajero}
            />
        </div>
    );
}


function AddForm(props) {
    const { persona, setPersona, pasajeroData, setPasajeroData, addPasajero, tarjeta, setTarjeta, Tipo_Pasajero } = props;
    const { Option } = Select;
    const accesToken = getAccessTokenApi();

    const PersonaCedula = (props) => {
        ObtenerPersonaCedula(accesToken, props).then(result => {
            if (result.message === "No se ha encontrado ninguna persona.") {
                notification["error"]({
                    message: result.message
                });
                setPersona({});
            } else {
                setPersona(result.persona);
            }
        });
    }

    const CodigoTarjeta = (props) => {
        ObtenerTarjetaCodigoP(accesToken, props, true).then(result => {
            if (result.message === "No se ha encontrado ninguna tarjeta.") {
                notification["error"]({
                    message: result.message
                });
                setTarjeta({});
            } else {
                setTarjeta(result.tarjeta);
            }
        });
    }

    const valor = valor => {
        var cadena = valor;
        var separador = ".";
        var arregloDeSubCadenas = cadena.toString().split(separador, 3);
        if (arregloDeSubCadenas[1] && arregloDeSubCadenas[1].length === 1) {
            cadena = arregloDeSubCadenas[0] + "." + arregloDeSubCadenas[1] + "0";
        }
        return cadena;
    }

    return (

        <Form className="form-edit" onSubmitCapture={addPasajero}>
            {/* ver los datos de la persona */}
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            id='Cedula'
                            prefix={<UserAddOutlined />}
                            maxLength="10"
                            placeholder="Cédula de la persona"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" onClick={() => PersonaCedula(document.getElementById('Cedula').value !== "" ? document.getElementById('Cedula').value : "11")} className="btn-submit">
                            Buscar datos
        </Button>
                    </Form.Item>
                </Col>
            </Row>

            {/* datos de la persona */}
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            disabled
                            prefix={<ContactsOutlined />}
                            placeholder="Nombre "
                            value={persona.nombre_persona}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            disabled
                            prefix={<ContactsOutlined />}
                            placeholder="Apellido"
                            value={persona.apellido_persona}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* Buscar Tarjeta  */}
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            id='CodigoT'
                            prefix={<CreditCardOutlined />}
                            placeholder="Código Tarjeta"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" onClick={() => CodigoTarjeta(document.getElementById('CodigoT').value !== "" ? document.getElementById('CodigoT').value : "11")} className="btn-submit">
                            Buscar Tarjeta
        </Button>
                    </Form.Item>
                </Col>
            </Row>

            {/* datos de la tarjeta */}
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            disabled
                            prefix={<DollarCircleOutlined />}
                            placeholder="Saldo"
                            value={tarjeta.valor_tarjeta ? valor(tarjeta.valor_tarjeta) : "0.00"}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            disabled
                            prefix={<InfoCircleOutlined />}
                            placeholder="Descripción"
                            value={tarjeta.descripcion}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccione tipo de pasajero"
                            onChange={e =>
                                setPasajeroData({ ...pasajeroData, id_tipo_pasajero: e })}
                            value={pasajeroData.id_tipo_pasajero}
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
                    Agregar Pasajero
        </Button>
            </Form.Item>
        </Form>
    );
}
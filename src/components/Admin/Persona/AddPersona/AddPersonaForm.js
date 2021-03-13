import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification, DatePicker } from "antd";
import { CrearPersona } from "../../../../api/persona";
import { getAccessTokenApi } from "../../../../api/auth";
import { UserOutlined, ContactsOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

import "./AddPersonaForm.scss";

export default function AddPersonaForm(props) {
    const { setIsVisibleModal, setReloadPersona } = props;
    const [personaData, setPersonaData] = useState({});
    const [FormatoCedula, setFormatoCedula] = useState(false);

    const addPersona = event => {
        event.preventDefault();

        if (
            !personaData.cedula_persona ||
            !personaData.nombre_persona ||
            !personaData.apellido_persona ||
            !personaData.direccion_persona ||
            !personaData.celular_persona ||
            !personaData.fecha_nacimiento_persona
        ) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else {
            if(!FormatoCedula){
                notification["error"]({
                    message: "Formato de cédula incorrecto."
                });
                return;
            }else{
            const accesToken = getAccessTokenApi();
            CrearPersona(accesToken, personaData)
                .then(response => {
                    if (response === "Persona creada exitosamente.") {
                        notification["success"]({
                            message: response
                        });
                        
                        setPersonaData({});
                        setIsVisibleModal(false);
                        setReloadPersona(true);
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
        }
    };

    return (
        <div className="add-user-form">
            <AddForm
                personaData={personaData}
                setpersonaData={setPersonaData}
                addpersona={addPersona}
                setReloadPersona={setReloadPersona}
                setFormatoCedula={setFormatoCedula}
            />
        </div>
    );
}


function AddForm(props) {
    const { personaData, setpersonaData, addpersona, setFormatoCedula } = props;
    const [Mensaje, setMensaje] = useState("Verificar Cédula");

    const validarCedula = cad => {
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;
        var i;
        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i));
                }
            }
            total = total % 10 ? 10 - total % 10 : 0;
            // eslint-disable-next-line
            if (cad.charAt(longitud - 1) == total ) {
                
                setMensaje("Cedula Correcta");
                setFormatoCedula(true);
            } else {
                setMensaje("Verificar Cédula");
                setFormatoCedula(false);
            }
        }
    }

    useEffect(() => {
        if (personaData.cedula_persona && personaData.cedula_persona.length === 10) {
            validarCedula(personaData.cedula_persona);
        } else {
            setMensaje("Verificar Cédula");
        }
        // eslint-disable-next-line
    }, [personaData.cedula_persona]);


    function onChange(dateString) {
        setpersonaData({ ...personaData, fecha_nacimiento_persona: dateString })
    }

    return (

        <Form className="form-add" onSubmitCapture={addpersona}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Cédula"
                            value={personaData.cedula_persona}
                            maxLength="10"
                            onChange={e =>
                                setpersonaData({ ...personaData, cedula_persona: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>                    
                    <DatePicker 
                    onChange={onChange} 
                    placeholder="Fecha de Nacimiento" 
                    className="Fecha"
                    value={personaData.fecha_nacimiento_persona}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<ContactsOutlined />}
                            placeholder="Nombre "
                            value={personaData.nombre_persona}
                            onChange={e =>
                                setpersonaData({ ...personaData, nombre_persona: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<ContactsOutlined />}
                            placeholder="Apellido"
                            value={personaData.apellido_persona}
                            onChange={e =>
                                setpersonaData({ ...personaData, apellido_persona: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<EnvironmentOutlined />}
                            placeholder="Dirección"
                            value={personaData.direccion_persona}
                            onChange={e =>
                                setpersonaData({ ...personaData, direccion_persona: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Celular"
                            maxLength="10"
                            value={personaData.celular_persona}
                            onChange={e =>
                                setpersonaData({ ...personaData, celular_persona: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        {Mensaje}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Agregar Persona
        </Button>
            </Form.Item>
        </Form>
    );
}
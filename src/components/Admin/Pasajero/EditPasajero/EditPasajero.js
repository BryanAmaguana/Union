import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { ActualizarPasajero } from "../../../../api/pasajero"
import { getAccessTokenApi } from "../../../../api/auth"
import { ObtenerPersonaCedula } from "../../../../api/persona";
import { ObtenerTarjetaCodigoP } from "../../../../api/tarjeta"
import { UserAddOutlined, ContactsOutlined, DollarCircleOutlined, InfoCircleOutlined, CreditCardOutlined } from '@ant-design/icons';


import "./EditPasajero.scss"

export default function EditPasajeroForm(props) {
    const { pasajero, Tipo_Pasajero, setIsVisibleModal, setReloadPasajero } = props;
    const [PasajeroData, setPasajeroData] = useState({});

    useEffect(() => {
        setPasajeroData({
            id_persona: pasajero.id_persona,
            cedula_persona: pasajero.cedula_persona,
            id_tarjeta_pasajero: pasajero.id_tarjeta_pasajero,
            id_tipo_pasajero: pasajero.id_tipo_pasajero._id,
            nombre_persona: pasajero.id_persona.nombre_persona,
            apellido_persona: pasajero.id_persona.apellido_persona,
            codigo: pasajero.id_tarjeta_pasajero.codigo,
            valor_tarjeta: pasajero.id_tarjeta_pasajero.valor_tarjeta,
            descripcion: pasajero.id_tarjeta_pasajero.descripcion,
            Tipo_nombre: pasajero.id_tipo_pasajero.nombre
        });
    }, [pasajero]);

    const ActualizarP = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let PasajeroActualizado = PasajeroData;

        if (!PasajeroActualizado.cedula_persona || !PasajeroActualizado.id_tarjeta_pasajero || !PasajeroActualizado.id_tipo_pasajero) {
            notification["error"]({
                message: "Campos Vacios."
            });
            return;
        }

        ActualizarPasajero(token, PasajeroActualizado, pasajero._id).then(result => {
            if (result.message === "Pasajero actualizado correctamente.") {
                setIsVisibleModal(false);
                setReloadPasajero(true);
            }
            notification["info"]({
                message: result.message
            });
            setReloadPasajero(true);
        });

    };

    return (
        <div className="edit-pasajero-form">
            <EditForm
                PasajeroData={PasajeroData}
                setPasajeroData={setPasajeroData}
                ActualizarPasajero={ActualizarP}
                Tipo_Pasajero={Tipo_Pasajero} />
        </div>
    );
}


function EditForm(props) {
    const { PasajeroData, setPasajeroData, ActualizarPasajero, Tipo_Pasajero } = props;
    const { Option } = Select;
    const accesToken = getAccessTokenApi();

    const PersonaCedula = (props) => {
        ObtenerPersonaCedula(accesToken, props).then(result => {
            if (result.message === "No se ha encontrado ninguna persona.") {
                notification["error"]({
                    message: result.message
                });
            } else {
                setPasajeroData({ ...PasajeroData, id_persona: result.persona._id, nombre_persona: result.persona.nombre_persona, apellido_persona: result.persona.apellido_persona })
            }
        });
    }

    const CodigoTarjeta = (props) => {
        ObtenerTarjetaCodigoP(accesToken, props, true).then(result => {
            if (result.message === "No se ha encontrado ninguna tarjeta.") {
                notification["error"]({
                    message: result.message
                });
            } else {
                setPasajeroData({ ...PasajeroData, id_tarjeta_pasajero: result.tarjeta._id, valor_tarjeta: result.tarjeta.valor_tarjeta, descripcion: result.tarjeta.descripcion })
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
        <Form className="form-edit" onSubmitCapture={ActualizarPasajero}>

            {/* ver los datos de la persona */}
            <div className="navbarContenido">
                <div className="BuscadorContenido" >
                    <Input
                        id='Cedula'
                        prefix={<UserAddOutlined />}
                        maxLength="10"
                        placeholder="Cédula de la persona"
                        value={PasajeroData.cedula_persona}
                        onChange={e =>
                            setPasajeroData({ ...PasajeroData, cedula_persona: e.target.value, nombre_persona: "", apellido_persona: "" })
                        }
                    />
                </div>
                <div className="BuscadorContenido" >
                    <Button type="primary" onClick={() => PersonaCedula(document.getElementById('Cedula').value !== "" ? document.getElementById('Cedula').value : "11")} className="btn-submit">
                        Buscar datos
                    </Button>

                </div>
            </div>

            {/* datos de la persona */}
            <div className="navbarContenido">
                <div className="BuscadorContenido" >
                    <Input
                        prefix={<ContactsOutlined />}
                        placeholder="Nombre "
                        value={PasajeroData.nombre_persona}
                    />
                </div>
                <div className="BuscadorContenido" >
                    <Input
                        prefix={<ContactsOutlined />}
                        placeholder="Apellido"
                        value={PasajeroData.apellido_persona}
                    />
                </div>
            </div>

            {/* codigo tarjeta */}
            <div className="navbarContenido">
                <div className="BuscadorContenido" >
                    <Input
                        id='CodigoT'
                        prefix={<CreditCardOutlined />}
                        placeholder="Código Tarjeta"
                        value={PasajeroData.codigo}
                        onChange={e =>
                            setPasajeroData({ ...PasajeroData, codigo: e.target.value, valor_tarjeta: "", descripcion: "" })
                        }
                    />
                </div>
                <div className="BuscadorContenido" >
                    <Button type="primary" onClick={() => CodigoTarjeta(document.getElementById('CodigoT').value !== "" ? document.getElementById('CodigoT').value : "11")} className="btn-submit">
                        Buscar Tarjeta
                    </Button>
                </div>
            </div>

            {/* Datos Tarjeta */}
            <div className="navbarContenido">
                <div className="BuscadorContenido" >
                    <Input
                        prefix={<DollarCircleOutlined />}
                        placeholder="Saldo"
                        value={PasajeroData.valor_tarjeta ? valor(PasajeroData.valor_tarjeta) : "0.00"}
                    />
                </div>
                <div className="BuscadorContenido" >
                    <Input
                        prefix={<InfoCircleOutlined />}
                        placeholder="Descripción"
                        value={PasajeroData.descripcion ? PasajeroData.descripcion.nombre : ""}
                    />
                </div>
            </div>

            {/* Tipo pasajero */}
            <div className="navbarContenido">
                <Select
                    className="BuscadorContenido2"
                    placeholder="Seleccione tipo de pasajero"
                    onChange={e =>
                        setPasajeroData({ ...PasajeroData, id_tipo_pasajero: e })}
                    value={PasajeroData.id_tipo_pasajero}
                >
                    {Tipo_Pasajero.map((item) => {
                        return <Option key={item._id.toString()} value={`${item._id}`}> {item.nombre} </Option>
                    })}
                </Select>
            </div>

            <Form.Item>
                <div className="navbarContenido">
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Actualizar Pasajero
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}

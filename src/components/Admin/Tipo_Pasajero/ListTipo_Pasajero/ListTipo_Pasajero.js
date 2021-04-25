import React, { useState } from "react";
import { Switch, List, Button, Tooltip, notification, /* Modal as ModalAntd */ } from "antd";
import { EditOutlined, StopOutlined, /* DeleteOutlined */ CheckOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditTipoForm from "../EditTipo_Pasajero";
import { ActivarTipo_Pasajero, /* EliminarTipo_Pasajero */ } from "../../../../api/tipo_pasajero";
import { getAccessTokenApi } from "../../../../api/auth";
import AddTipoForm from "../AddTipo_Pasajero";

import "./ListTipo_Pasajero.scss";

/* const { confirm } = ModalAntd; */

export default function ListTipoP(props) {
    const { TipoActivos, TipoInactivos, setReloadTipo } = props;
    const [VerTipoActivos, setVerTipoActivos] = useState(true);
    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    /* Modal para agregar usuario */
    const AgregarTipoModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Agregar nuevo Tipo de Pasajero");
        setModalContent(
            <AddTipoForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadTipo={setReloadTipo}
            />
        );
    };

    return (
        /* switch y boton agregar usuario */
        <div className="list-tipo">
            <div className="navbar">
                <div className="switch" >
                    <Switch
                        defaultChecked
                        onChange={() => { setVerTipoActivos(!VerTipoActivos) }}
                    />
                    <span >
                        {VerTipoActivos ? "Tipo de Pasajeros Activos" : "Tipo de Pasajeros Inactivos"}
                    </span>
                </div>
                <div className="BuscadorB" >
                    <Button type="primary" className="BuscadorB" onClick={AgregarTipoModal}>
                        Nuevo Tipo de Pasajero
                    </Button>
                </div>
            </div>


            {/* listado de usuarios activos e inactivos */}
            {VerTipoActivos ? (
                <TipoPActivo
                    TipoActivos={TipoActivos}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setReloadTipo={setReloadTipo}
                    setModalContent={setModalContent} />) : (
                <TipoPInactivo TipoInactivos={TipoInactivos} setReloadTipo={setReloadTipo} />)}

            {/* Modal para editar */}
            <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>

        </div>
    );
}

/* Metodo para llamar a los usuarios activos */
function TipoPActivo(props) {
    const { TipoActivos, setIsVisibleModal, setModalTitle, setModalContent, setReloadTipo } = props;
    /* Metodo para activar modal y editar tipo de pasajeros */
    const EditarTipo_Pasajero = tipo => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Tipo de Pasajero : 
    ${tipo.nombre ? tipo.nombre : '...'}`);
        setModalContent(
            <EditTipoForm
                tipo={tipo}
                setIsVisibleModal={setIsVisibleModal}
                setReloadTipo={setReloadTipo} />)
    }

    return (
        <List
            className="tipo-active"
            itemLayout="horizontal"
            dataSource={TipoActivos}
            renderItem={
                tipo => <ListaTPActivos
                    tipo={tipo}
                    EditarTipo_Pasajero={EditarTipo_Pasajero}
                    setReloadTipo={setReloadTipo} />}
        />

    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaTPActivos(props) {
    const { tipo, EditarTipo_Pasajero, setReloadTipo } = props;

    const desactivarTipo = () => {
        const accesToken = getAccessTokenApi();

        ActivarTipo_Pasajero(accesToken, tipo._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadTipo(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    };

    /*     const ConfirmarEliminar = () => {
            const accesToken = getAccessTokenApi();
    
            confirm({
                title: "Eliminando Tipo de pasajero",
                content: `¿Esta seguro que desea eliminar al Tipo de pasajero : ${tipo.nombre}?`,
                okText: "Eliminar",
                okType: "danger",
                cancelText: "Cancelar",
                onOk() {
                    EliminarTipo_Pasajero(accesToken, tipo._id)
                        .then(response => {
                            notification["success"]({
                                message: response
                            });
                            setReloadTipo(true);
                        })
                        .catch(err => {
                            notification["error"]({
                                message: err
                            });
                        });
                }
            });
        }; */

    const Valor = valor => {
        var cadena = valor;
        var separador = ".";
        var arregloDeSubCadenas = cadena.toString().split(separador, 3);
        if (arregloDeSubCadenas[1] && arregloDeSubCadenas[1].length === 1) {
            cadena = arregloDeSubCadenas[0] + "." + arregloDeSubCadenas[1] + "0";
        }
        return cadena;
    }

    return (
        <List.Item
            actions={[

                <div className="navbarContenido">
                    <div className="BuscadorContenido" >
                        <Tooltip title="Editar">
                            <Button type="primary" onClick={() => EditarTipo_Pasajero(tipo)} >
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="BuscadorContenido" >
                        <Tooltip title="Desactivar">
                            <Button type="danger" onClick={() => desactivarTipo()}>
                                <StopOutlined />
                            </Button>
                        </Tooltip>

                        {/* <Tooltip title="Eliminar">
                  <Button type="danger" onClick={() => ConfirmarEliminar()}>
                    <DeleteOutlined />
                  </Button></Tooltip> */}
                    </div>
                </div>

            ]}
        >
            <List.Item.Meta
                title={`Tipo de pasajero :  ${tipo.nombre ? tipo.nombre : '...'}`}
                description={
                    <div>
                        <b>Valor :</b> {tipo.valor ? Valor(tipo.valor) : '0.00'}
                        <br />
                        <b>Descripción:</b> {tipo.descripcion ? tipo.descripcion : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

/* Metodo para llamar a los usuarios inactivos */
function TipoPInactivo(props) {
    const { TipoInactivos, setReloadTipo } = props
    return (
        <List
            className="tipo-active"
            itemLayout="horizontal"
            dataSource={TipoInactivos}
            renderItem={tipo => (<ListaTPInactivos tipo={tipo} setReloadTipo={setReloadTipo} />)}
        />
    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaTPInactivos(props) {
    const { tipo, setReloadTipo } = props;

    const activarTipo_Pasajero = () => {
        const accesToken = getAccessTokenApi();

        ActivarTipo_Pasajero(accesToken, tipo._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadTipo(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    };
    /* 
        const ConfirmarEliminar = () => {
            const accesToken = getAccessTokenApi();
    
            confirm({
                title: "Eliminando Tipo de pasajero",
                content: `¿Esta seguro que desea eliminar al Tipo de pasajero : ${tipo.nombre}?`,
                okText: "Eliminar",
                okType: "danger",
                cancelText: "Cancelar",
                onOk() {
                    EliminarTipo_Pasajero(accesToken, tipo._id)
                        .then(response => {
                            notification["success"]({
                                message: response
                            });
                            setReloadTipo(true);
                        })
                        .catch(err => {
                            notification["error"]({
                                message: err
                            });
                        });
                }
            });
        }; */

    const Valor = valor => {
        var cadena = valor;
        var separador = ".";
        var arregloDeSubCadenas = cadena.toString().split(separador, 3);
        if (arregloDeSubCadenas[1] && arregloDeSubCadenas[1].length === 1) {
            cadena = arregloDeSubCadenas[0] + "." + arregloDeSubCadenas[1] + "0";
        }
        return cadena;
    }

    return (
        <List.Item
            actions={[
                <Tooltip title="Activar">
                    <Button type="primary" onClick={() => activarTipo_Pasajero()}>
                        <CheckOutlined />
                    </Button>
                </Tooltip>,
                /*                 <Tooltip title="Eliminar">
                                    <Button type="danger" onClick={() => ConfirmarEliminar()}>
                                        <DeleteOutlined />
                                    </Button>
                                </Tooltip> */
            ]}
        >
            <List.Item.Meta
                title={`Tipo de pasajero :  ${tipo.nombre ? tipo.nombre : '...'}`}
                description={
                    <div>
                        <b>Valor :</b> {tipo.valor ? Valor(tipo.valor) : '0.00'}
                        <br />
                        <b>Descripción:</b> {tipo.descripcion ? tipo.descripcion : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

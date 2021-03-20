import React, { useState } from "react";
import { Switch, List, Button, Tooltip, notification, Modal as ModalAntd } from "antd";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import Modal from "../../../Modal";
import EditRutaForm from "../EditRuta";
import { ActivarRuta, EliminarRuta } from "../../../../api/ruta";
import { getAccessTokenApi } from "../../../../api/auth";
import AddRutaForm from "../AddRuta";

import "./ListRuta.scss";

const { confirm } = ModalAntd;

export default function ListRuta(props) {
    const { RutaActivos, RutaInactivos, setReloadRuta } = props;
    const [VerRutaActivos, setVerRutaActivos] = useState(true);
    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    /* Modal para agregar usuario */
    const AgregarRutaModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Agregar nueva Ruta");
        setModalContent(
            <AddRutaForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadRuta={setReloadRuta}
            />
        );
    };

    return (
        /* switch y boton agregar usuario */
        <div className="list-ruta">
            <div className="list-ruta__header">
                <div className="list-ruta__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => { setVerRutaActivos(!VerRutaActivos) }}
                    />
                    <span >
                        {VerRutaActivos ? "Rutas Activas" : "Rutas Inactivas"}
                    </span>
                </div>

                <Button type="primary" onClick={AgregarRutaModal}>
                    Nueva Ruta
        </Button>
            </div>

            {/* listado de usuarios activos e inactivos */}
            {VerRutaActivos ? (
                <RutActivo
                    RutaActivos={RutaActivos}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setReloadRuta={setReloadRuta}
                    setModalContent={setModalContent} />) : (
                <RutaInactivo RutaInactivos={RutaInactivos} setReloadRuta={setReloadRuta} />)}

            {/* Modal para editar */}
            <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>

        </div>
    );
}

/* Metodo para llamar a los usuarios activos */
function RutActivo(props) {
    const { RutaActivos, setIsVisibleModal, setModalTitle, setModalContent, setReloadRuta } = props;
    /* Metodo para activar modal y editar rutas, llamada a EditUserForm */
    const EditarRuta = ruta => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Ruta : 
    ${ruta.nombre_ruta ? ruta.nombre_ruta : '...'}
    ${ruta.numero_ruta ? ruta.numero_ruta : '...'}`);
        setModalContent(
            <EditRutaForm
            ruta={ruta}
                setIsVisibleModal={setIsVisibleModal}
                setReloadRuta={setReloadRuta} />)
    }

    return (
        <List
            className="ruta-active"
            itemLayout="horizontal"
            dataSource={RutaActivos}
            renderItem={
                ruta => <ListaRutaActivos
                    ruta={ruta}
                    EditarRuta={EditarRuta}
                    setReloadRuta={setReloadRuta} />}
        />

    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaRutaActivos(props) {
    const { ruta, EditarRuta, setReloadRuta } = props;

    const desactivarTarjeta = () => {
        const accesToken = getAccessTokenApi();

        ActivarRuta(accesToken, ruta._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadRuta(true);
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
            title: "Eliminando Ruta",
            content: `¿Esta seguro que desea eliminar a la Ruta: ${ruta.nombre_ruta}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                EliminarRuta(accesToken, ruta._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadRuta(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
            }
        });
    };
 */
    return (
        <List.Item
            actions={[
                <Tooltip title="Editar">
                    <Button type="primary" onClick={() => EditarRuta(ruta)} >
                        <EditOutlined />
                    </Button>
                </Tooltip>,

                <Tooltip title="Desactivar">
                    <Button type="danger" onClick={() => desactivarTarjeta()}>
                        <StopOutlined />
                    </Button>
                </Tooltip>,

/*                 <Tooltip title="Eliminar">
                    <Button type="danger" onClick={() => ConfirmarEliminar()}>
                        <DeleteOutlined />
                    </Button></Tooltip> */
            ]}
        >
            <List.Item.Meta
                title={`Ruta :  ${ruta.nombre_ruta ? ruta.nombre_ruta : '...'}`}
                description={
                    <div>
                        <b>N˚:</b> {ruta.numero_ruta ? ruta.numero_ruta : '...'}
                        <br />
                        <b>Descripción:</b> {ruta.descripcion ? ruta.descripcion : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

/* Metodo para llamar a los usuarios inactivos */
function RutaInactivo(props) {
    const { RutaInactivos, setReloadRuta } = props
    return (
        <List
            className="ruta-active"
            itemLayout="horizontal"
            dataSource={RutaInactivos}
            renderItem={ruta => (<ListaRutaInactivos ruta={ruta} setReloadRuta={setReloadRuta} />)}
        />
    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaRutaInactivos(props) {
    const { ruta, setReloadRuta } = props;

    const activarRuta = () => {
        const accesToken = getAccessTokenApi();

        ActivarRuta(accesToken, ruta._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadRuta(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    };

    const ConfirmarEliminar = () => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando Ruta",
            content: `¿Esta seguro que desea eliminar a la Ruta: ${ruta.nombre_ruta}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                EliminarRuta(accesToken, ruta._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadRuta(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
            }
        });
    };

    return (
        <List.Item
            actions={[
                <Tooltip title="Activar">
                    <Button type="primary" onClick={() => activarRuta()}>
                        <CheckOutlined />
                    </Button>
                </Tooltip>,
                <Tooltip title="Eliminar">
                    <Button type="danger" onClick={() => ConfirmarEliminar()}>
                        <DeleteOutlined />
                    </Button>
                </Tooltip>
            ]}
        >
            <List.Item.Meta
                title={`Ruta :  ${ruta.nombre_ruta ? ruta.nombre_ruta : '...'}`}
                description={
                    <div>
                        <b>N˚:</b> {ruta.numero_ruta ? ruta.numero_ruta : '...'}
                        <br />
                        <b>Descripción:</b> {ruta.descripcion ? ruta.descripcion : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

import React, { useState, useEffect } from "react";
import { List, Input, Avatar, Button, Tooltip, notification, Modal as ModalAntd } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import { ObtenerPersona, BuscarPersonaCedula, EliminarPersona } from "../../../../api/persona";
import { getAccessTokenApi } from "../../../../api/auth";
import AddPersonaForm from "../AddPersona";
import EditPersona from "../EditPersona";

import "./ListPersona.scss";


const { confirm } = ModalAntd;

export default function ListPersona(props) {
    const { persona, setpersona, setReloadPersona } = props;
    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [BusquedaPersona, setBusquedaPersona] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(4);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 4;

    /* Modal para agregar usuario */
    const AgregarPersonaModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Agregar nueva persona");
        setModalContent(
            <AddPersonaForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPersona={setReloadPersona}
            />
        );
    };

    /* Buscar usuarios */
    const Buscar = cedula => {
        setBusquedaPersona(persona);
        if (cedula === "" || cedula === " ") {
            setBusquedaPersona(persona);
        } else {
            BuscarPersonaCedula(token, cedula)
                .then(response => {
                    setBusquedaPersona(response.persona)
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    return (
        /* switch y boton agregar persona */
        <div className="list-persona">
            <div className="list-persona__header">
                {/* Buscar persona */}
                <div className="form-edit">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder=" Buscar por cédula "
                        onChange={
                            event => Buscar(event.target.value)
                        }
                    />
                </div>
                {/* .............. */}
                <Button type="primary" onClick={AgregarPersonaModal}>
                    Nueva Persona
          </Button>
            </div>

            {/* listado de usuarios activos e inactivos */}
            <Personas
                persona={BusquedaPersona ? BusquedaPersona : persona}
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setReloadPersona={setReloadPersona} />
            {/* Modal para editar */}
            <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>

            {/* Paginacion de los usuarios Activos  */}
            <div className="centradoL">
                <Paginacion
                    paginaActual={paginaActual}
                    setpaginaActual={setpaginaActual}
                    token={token}
                    setpersona={setpersona}
                    desde={desde}
                    setDesde={setDesde}
                    limite={limite}
                    setLimite={setLimite}
                    NumeroPorPagina={NumeroPorPagina} />
            </div>
        </div>
    );
}


/* Mostrar 4 siguientes usuarios Activos */
function Paginacion(props) {
    const { paginaActual, setpaginaActual, token, setpersona, desde, setDesde, limite, setlimite, NumeroPorPagina } = props;
    useEffect(() => {
        ObtenerPersona(token, desde, limite).then(response => {
            setpersona(response.persona);
            if ((response.persona).length < NumeroPorPagina) {
                document.getElementById('siguiente').disabled = true;
            }
        });
    }, [desde, limite, token, setpersona, setDesde, setlimite, NumeroPorPagina]);

    const Siguiente = () => {
        var PA = paginaActual + 1
        setpaginaActual(PA)
        setDesde(desde + limite);
        document.getElementById('anterior').disabled = false;
    }

    const Atras = () => {
        if (paginaActual > 1) {
            var PA = paginaActual - 1
            setpaginaActual(PA)
            setDesde(desde - limite);
            document.getElementById('siguiente').disabled = false;
        }
        if (paginaActual === 1) {
            document.getElementById('anterior').disabled = true;
        }
    }

    return (
        <div>
            <Button id='anterior' className="centradoB" type="primary" onClick={Atras}>
                Anterior
        </Button>
            <Button className="centradoB" type="second">
                {paginaActual}
            </Button>

            <Button id='siguiente' className="centradoB" type="primary" onClick={Siguiente}>
                Siguiente
        </Button>
        </div>
    )
}


/* Metodo para llamar a los usuarios activos */
function Personas(props) {
    const { persona, setIsVisibleModal, setModalTitle, setModalContent, setReloadPersona } = props;
    /* Metodo para activar modal y editar usuario, llamada a EditUserForm */
    const EditarPersona = persona => {
        setIsVisibleModal(true);
        setModalTitle(`Editar: 
      ${persona.apellido_persona ? persona.apellido_persona : '...'}
      ${persona.nombre_persona ? persona.nombre_persona : '...'}`);
        setModalContent(<EditPersona
        persona={persona}
        setIsVisibleModal={setIsVisibleModal}
        setReloadPersona={setReloadPersona} />);
    }

    return (
        <List
            className="persona-active"
            itemLayout="horizontal"
            dataSource={persona}
            renderItem={
                persona => <ListaPersonas
                    persona={persona}
                    EditarPersona={EditarPersona}
                    setReloadPersona={setReloadPersona} />}
        />

    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaPersonas(props) {
    const { persona, EditarPersona, setReloadPersona } = props;

    const ConfirmarEliminar = () => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando Persona",
            content: `¿Estas seguro que deseas eliminar a ${persona.nombre_persona} ${persona.apellido_persona}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                EliminarPersona(accesToken, persona._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadPersona(true);
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
                <Tooltip title="Editar">
                    <Button type="primary" onClick={() => EditarPersona(persona)} >
                        <EditOutlined />
                    </Button>
                </Tooltip>,

                <Tooltip title="Eliminar">
                    <Button type="danger" onClick={() => ConfirmarEliminar()}>
                        <DeleteOutlined />
                    </Button></Tooltip>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={NoAvatar} />}
                title={`
              ${persona.apellido_persona ? persona.apellido_persona : '...'}
              ${persona.nombre_persona ? persona.nombre_persona : '...'}
           ` }
                description={
                    <div>
                        <b>Cédula:</b> {persona.cedula_persona ? persona.cedula_persona : '...'}
                        <br />
                        <b>Dirección:</b> {persona.direccion_persona ? persona.direccion_persona : '...'}
                        <br />
                        <b>Contacto:</b> {persona.celular_persona ? persona.celular_persona : '...'}
                        <br />
                        <b>Fecha de Nacimiento:</b> {persona.fecha_nacimiento_persona ? persona.fecha_nacimiento_persona.substr(0,10) : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}


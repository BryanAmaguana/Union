import React, { useState, useEffect } from "react";
import { Switch, List, Input, Button, Avatar, Tooltip, notification, /* Modal as ModalAntd */ } from "antd";
import { EditOutlined, StopOutlined, /* DeleteOutlined */ CheckOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import NoAvatar from "../../../../assets/img/png/pasajero.png";
import EditPasajero from "../EditPasajero";
import { ActivarPasajero, /* EliminarPasajero */ ObtenerCedulaPasajero, ObtenerPasajero, ObtenerCodigoPasajero } from "../../../../api/pasajero";
import { ActivarTarjeta } from "../../../../api/tarjeta";
import { getAccessTokenApi } from "../../../../api/auth";
import AddPasajero from "../AddPasajero";


import "./ListPasajero.scss";

/* const { confirm } = ModalAntd; */

export default function ListPasajero(props) {
    const { PasajeroActivos, setPasajeroActivos, PasajeroInactivos, setPasajeroInactivos, setReloadPasajero, Tipo_Pasajero } = props;
    const [VerPasajeroActivo, setVerPasajeroActivo] = useState(true);
    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [BusquedaPasajeroActivo, setBuquedaPasajeroA] = useState(false);
    const [BusquedaPasajeroInactivo, setBusquedaPasajeroI] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [BotonesPaginacion, setBotonesPaginacion] = useState(true);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(3);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 3;

    /* Actualizacion de Tarjetas */
    var hoy = new Date();
    let Dia = hoy.getDate();
    let Mes = hoy.getMonth();

    if (Mes === Dia) {
        PasajeroActivos.forEach(pasajero => {
            var id_tipo = 0;
            var cumpleanos = new Date(pasajero.id_persona.fecha_nacimiento_persona);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
            if (edad < 18) {
                for (let i = 0; i < Tipo_Pasajero.length; i++) {
                    if (Tipo_Pasajero[i].nombre === "Estudiante") {
                        id_tipo = Tipo_Pasajero[i]._id
                    }
                }
            } else if (edad >= 18) {
                for (let i = 0; i < Tipo_Pasajero.length; i++) {
                    if (Tipo_Pasajero[i].nombre === "Adulto") {
                        id_tipo = Tipo_Pasajero[i]._id
                    }
                }
            } else if (edad >= 60) {
                for (let i = 0; i < Tipo_Pasajero.length; i++) {
                    if (Tipo_Pasajero[i].nombre === "Tercera Edad") {
                        id_tipo = Tipo_Pasajero[i]._id
                    }
                }
            } else {
                for (let i = 0; i < Tipo_Pasajero.length; i++) {
                    if (Tipo_Pasajero[i].nombre === "Especial") {
                        id_tipo = Tipo_Pasajero[i]._id
                    }
                }
            }
            if (id_tipo !== pasajero.id_tipo_pasajero._id) {
                ActivarTarjeta(token, pasajero.id_tarjeta_pasajero._id, false);
                notification["info"]({
                    message: "Actualizando tarjetas de usuarios.. "
                });
            }
        });
    }

    /* Modal para agregar buses */
    const AgregarPasajeroModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Agregar nuevo Pasajero");
        setModalContent(
            <AddPasajero
                setIsVisibleModal={setIsVisibleModal}
                setReloadPasajero={setReloadPasajero}
                Tipo_Pasajero={Tipo_Pasajero}
            />
        );
    };

    /* Buscar buses */
    const Buscar = cedula => {
        setBuquedaPasajeroA(PasajeroActivos);
        setBusquedaPasajeroI(PasajeroInactivos);
        if (cedula === "" || cedula === " ") {
            setBuquedaPasajeroA(PasajeroActivos);
            setBusquedaPasajeroI(PasajeroInactivos);
        } else {
            ObtenerCedulaPasajero(token, cedula, true)
                .then(response => {
                    setBuquedaPasajeroA(response.pasajero)
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
            ObtenerCedulaPasajero(token, cedula, false)
                .then(response => {
                    setBusquedaPasajeroI(response.pasajero)
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    const BuscarCodigo = codigo => {
        setBuquedaPasajeroA(PasajeroActivos);
        setBusquedaPasajeroI(PasajeroInactivos);
        if (codigo === "" || codigo === " ") {
            setBuquedaPasajeroA(PasajeroActivos);
            setBusquedaPasajeroI(PasajeroInactivos);
        } else {
            ObtenerCodigoPasajero(token, codigo, true)
                .then(response => {
                    setBuquedaPasajeroA(response.pasajero)
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
            ObtenerCodigoPasajero(token, codigo, false)
                .then(response => {
                    setBusquedaPasajeroI(response.pasajero)
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    return (
        /* switch y boton agregar buses */
        <div className="list-pasajero">
            <div className="navbar">
                <div className="switch" >
                    <Switch
                        defaultChecked
                        onChange={() => { setVerPasajeroActivo(!VerPasajeroActivo); setpaginaActual(1); setDesde(0); setLimite(3); setBotonesPaginacion(!BotonesPaginacion) }}
                    />
                    <span >
                        {VerPasajeroActivo ? "Pasajeros Activos" : "Pasajeros Inactivos"}
                    </span>
                </div>
                <div className="Buscador" >
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Buscar cedula del Pasajero"
                        onChange={
                            event => Buscar(event.target.value)
                        }
                    />
                </div>

                <div className="Buscador" >
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Buscar Codigo Tarjeta"
                        onChange={
                            event => BuscarCodigo(event.target.value)
                        }
                    />
                </div>

                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={AgregarPasajeroModal}>
                        Nuevo Pasajero
                    </Button>
                </div>
            </div>

            {/* listado de buses activos e inactivos */}
            {VerPasajeroActivo ? (
                <LPasajeroActivo
                    PasajeroActivos={BusquedaPasajeroActivo ? BusquedaPasajeroActivo : PasajeroActivos}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setReloadPasajero={setReloadPasajero}
                    setModalContent={setModalContent}
                    Tipo_Pasajero={Tipo_Pasajero} />) : (
                <LPasajeroInactivo PasajeroInactivos={BusquedaPasajeroInactivo ? BusquedaPasajeroInactivo : PasajeroInactivos} setReloadPasajero={setReloadPasajero} />)}

            {/* Modal para editar */}
            <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>

            {/* Paginacion de los buses Activos  */}
            <div className="centradoL">
                {BotonesPaginacion ?
                    <PaginacionA
                        paginaActual={paginaActual}
                        setpaginaActual={setpaginaActual}
                        token={token}
                        setPasajeroActivos={setPasajeroActivos}
                        desde={desde}
                        setDesde={setDesde}
                        limite={limite}
                        setPasajeroInactivos={setPasajeroInactivos}
                        NumeroPorPagina={NumeroPorPagina}
                        setReloadPasajero={setReloadPasajero} /> :
                    <PaginacionI
                        paginaActual={paginaActual}
                        setpaginaActual={setpaginaActual}
                        token={token}
                        setPasajeroActivos={setPasajeroActivos}
                        desde={desde}
                        setDesde={setDesde}
                        limite={limite}
                        setPasajeroInactivos={setPasajeroInactivos}
                        NumeroPorPagina={NumeroPorPagina}
                        setReloadPasajero={setReloadPasajero} />
                }
            </div>
        </div>
    );
}

function PaginacionA(props) {
    const { paginaActual, setpaginaActual, token, setPasajeroActivos, desde, setDesde, limite, setPasajeroInactivos, NumeroPorPagina, setReloadPasajero } = props;
    useEffect(() => {
        ObtenerPasajero(token, true, desde, limite).then(response => {
            setPasajeroActivos(response.pasajero);
            try {
                if ((response.pasajero).length < NumeroPorPagina) {
                    document.getElementById('siguiente').disabled = true;
                }
            } catch (error) {
                setReloadPasajero(true);
            }
        });
        // eslint-disable-next-line
    }, [desde, limite, token, setPasajeroActivos, setDesde, setPasajeroInactivos, NumeroPorPagina]);

    const Siguiente = () => {
        try {
            var PA = paginaActual + 1
            setpaginaActual(PA)
            setDesde(desde + limite);
            document.getElementById('anterior').disabled = false;
        } catch (error) {

        }

    }

    const Atras = () => {
        if (paginaActual > 1) {
            try {
                var PA = paginaActual - 1
                setpaginaActual(PA)
                setDesde(desde - limite);
                document.getElementById('siguiente').disabled = false;
            } catch (error) {
            }
        }
        if (paginaActual === 1) {
            document.getElementById('anterior').disabled = true;
        }
    }

    return (
        <div className="navbar">

            <div className="BuscadorB" >
                <Button id='anterior' className="centradoB" type="primary" onClick={Atras}>
                    Anterior
                </Button>
            </div>


            <div className="BuscadorB" >
                <Button className="centradoB" type="second">
                    {paginaActual}
                </Button>
            </div>

            <div className="BuscadorB" >
                <Button id='siguiente' className="centradoB" type="primary" onClick={Siguiente}>
                    Siguiente
                </Button>
            </div>

        </div>
    )
}

/* Mostrar 4 siguientes buses Inactivos */
function PaginacionI(props) {
    const { paginaActual, setpaginaActual, token, setPasajeroActivos, desde, setDesde, limite, setPasajeroInactivos, NumeroPorPagina, setReloadPasajero } = props;
    useEffect(() => {
        ObtenerPasajero(token, false, desde, limite).then(response => {
            setPasajeroInactivos(response.pasajero);
            try {
                if ((response.pasajero).length < NumeroPorPagina) {
                    document.getElementById('siguiente').disabled = true;
                }
            } catch (error) {
                setReloadPasajero(true);
            }
        });
        // eslint-disable-next-line
    }, [desde, limite, token, setPasajeroActivos, setDesde, setPasajeroInactivos, NumeroPorPagina]);

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
        <div className="navbar">

            <div className="BuscadorB" >
                <Button id='anterior' className="centradoB" type="primary" onClick={Atras}>
                    Anterior
                </Button>
            </div>


            <div className="BuscadorB" >
                <Button className="centradoB" type="second">
                    {paginaActual}
                </Button>
            </div>

            <div className="BuscadorB" >
                <Button id='siguiente' className="centradoB" type="primary" onClick={Siguiente}>
                    Siguiente
                </Button>
            </div>

        </div>
    )
}

/* Metodo para llamar a los buses activos */
function LPasajeroActivo(props) {
    const { PasajeroActivos, setIsVisibleModal, setModalTitle, setModalContent, setReloadPasajero, Tipo_Pasajero } = props;
    /* Metodo para activar modal y editar pasajero*/
    const EditarPasajero = pasajero => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Pasajero con cedula:
        ${pasajero.id_persona.nombre_persona} 
        ${pasajero.id_persona.apellido_persona}`);
        setModalContent(
            <EditPasajero
                pasajero={pasajero}
                Tipo_Pasajero={Tipo_Pasajero}
                setIsVisibleModal={setIsVisibleModal}
                setReloadPasajero={setReloadPasajero} />)
    }

    return (
        <List
            className="pasajero-active"
            itemLayout="horizontal"
            dataSource={PasajeroActivos}
            renderItem={
                pasajero => <ListaPActivos
                    pasajero={pasajero}
                    Tipo_Pasajero={Tipo_Pasajero}
                    EditarPasajero={EditarPasajero}
                    setReloadPasajero={setReloadPasajero} />}
        />

    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaPActivos(props) {
    const { pasajero, EditarPasajero, setReloadPasajero } = props;

    const desactivarPasajero = () => {
        const accesToken = getAccessTokenApi();

        ActivarPasajero(accesToken, pasajero._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadPasajero(true);
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
                title: "Eliminando Pasajero",
                content: `¿Esta seguro que desea eliminar al Pasajero:  ${pasajero.id_persona.nombre_persona} ${pasajero.id_persona.apellido_persona}?`,
                okText: "Eliminar",
                okType: "danger",
                cancelText: "Cancelar",
                onOk() {
                    EliminarPasajero(accesToken, pasajero._id)
                        .then(response => {
                            notification["success"]({
                                message: response
                            });
                            setReloadPasajero(true);
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
                            <Button type="primary" onClick={() => EditarPasajero(pasajero)} >
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="BuscadorContenido" >
                        <Tooltip title="Desactivar">
                            <Button type="danger" onClick={() => desactivarPasajero()}>
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
                avatar={<Avatar src={NoAvatar} />}
                title={`Pasajero: 
                ${pasajero.id_persona.nombre_persona ? pasajero.id_persona.nombre_persona : "..."} 
                ${pasajero.id_persona.apellido_persona ? pasajero.id_persona.apellido_persona : "..."}
           ` }
                description={
                    <div>

                        <b>Saldo de la tarjeta: </b> {pasajero.id_tarjeta_pasajero.valor_tarjeta ? Valor(pasajero.id_tarjeta_pasajero.valor_tarjeta) : '0.00'}
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <b>Tarifa: </b> {pasajero.id_tipo_pasajero.valor ? Valor(pasajero.id_tipo_pasajero.valor) : '...'}
                        <br />
                        <b>Código de tarjeta: </b> {pasajero.id_tarjeta_pasajero.codigo ? pasajero.id_tarjeta_pasajero.codigo : '...'}
                        <br />
                        <b>Tipo de Pasajero: </b> {pasajero.id_tipo_pasajero.nombre ? pasajero.id_tipo_pasajero.nombre : '...'}
                        <br />
                        <b>Tarjeta: </b> {pasajero.id_tarjeta_pasajero.disponible === true ? "Activo" : ' Desactivada'}
                        <br />
                        <b>Cédula: </b> {pasajero.cedula_persona ? pasajero.cedula_persona : '...'}
                        <br />
                        <b>Dirección: </b> {pasajero.id_persona.direccion_persona ? pasajero.id_persona.direccion_persona : '...'}
                        <br />
                        <b>Celular: </b> {pasajero.id_persona.celular_persona ? pasajero.id_persona.celular_persona : '...'}

                    </div>
                }
            />
        </List.Item>
    );
}

/* Metodo para llamar a los usuarios inactivos */
function LPasajeroInactivo(props) {
    const { PasajeroInactivos, setReloadPasajero } = props
    return (
        <List
            className="pasajero-active"
            itemLayout="horizontal"
            dataSource={PasajeroInactivos}
            renderItem={pasajero => (<ListaPInactivos pasajero={pasajero} setReloadPasajero={setReloadPasajero} />)}
        />
    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaPInactivos(props) {
    const { pasajero, setReloadPasajero } = props;

    const activarPasajero = () => {
        const accesToken = getAccessTokenApi();

        ActivarPasajero(accesToken, pasajero._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadPasajero(true);
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
                title: "Eliminando Pasajero",
                content: `¿Esta seguro que desea eliminar al Pasajero:  ${pasajero.id_persona.nombre_persona} ${pasajero.id_persona.apellido_persona}?`,
                okText: "Eliminar",
                okType: "danger",
                cancelText: "Cancelar",
                onOk() {
                    EliminarPasajero(accesToken, pasajero._id)
                        .then(response => {
                            notification["success"]({
                                message: response
                            });
                            setReloadPasajero(true);
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
                    <Button type="primary" onClick={() => activarPasajero()}>
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
                avatar={<Avatar src={NoAvatar} />}
                title={`Pasajero: 
                ${pasajero.id_persona.nombre_persona ? pasajero.id_persona.nombre_persona : "..."} 
                ${pasajero.id_persona.apellido_persona ? pasajero.id_persona.apellido_persona : "..."}
           ` }
                description={
                    <div>

                        <b>Saldo de la tarjeta: </b> {pasajero.id_tarjeta_pasajero.valor_tarjeta ? Valor(pasajero.id_tarjeta_pasajero.valor_tarjeta) : '0.00'}
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <b>Tarifa: </b> {pasajero.id_tipo_pasajero.valor ? Valor(pasajero.id_tipo_pasajero.valor) : '...'}
                        <br />
                        <b>Código de tarjeta: </b> {pasajero.id_tarjeta_pasajero.codigo ? pasajero.id_tarjeta_pasajero.codigo : '...'}
                        <br />
                        <b>Tipo de Pasajero: </b> {pasajero.id_tipo_pasajero.nombre ? pasajero.id_tipo_pasajero.nombre : '...'}
                        <br />
                        <b>Tarjeta: </b> {pasajero.id_tarjeta_pasajero.disponible === true ? "Activo" : ' Desactivada'}
                        <br />
                        <b>Cédula: </b> {pasajero.cedula_persona ? pasajero.cedula_persona : '...'}
                        <br />
                        <b>Dirección: </b> {pasajero.id_persona.direccion_persona ? pasajero.id_persona.direccion_persona : '...'}
                        <br />
                        <b>Celular: </b> {pasajero.id_persona.celular_persona ? pasajero.id_persona.celular_persona : '...'}

                    </div>
                }
            />
        </List.Item>
    );
}

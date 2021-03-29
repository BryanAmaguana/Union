import React, { useState, useEffect } from "react";
import { Switch, List, Input, Button, Avatar, Tooltip, notification, /* Modal as ModalAntd */ } from "antd";
import { EditOutlined, StopOutlined, /* DeleteOutlined */ CheckOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import NoAvatar from "../../../../assets/img/png/Nobus.png";
import EditBusForm from "../EditBus";
import { ActivarBus, /* EliminarBus */ ObtenerBusNumero, ObtenerBus} from "../../../../api/bus";
import { getAccessTokenApi } from "../../../../api/auth";
import AddBus from "../AddBus";

import "./ListBus.scss";

/* const { confirm } = ModalAntd; */

export default function ListBus(props) {
    const { BusActivo, setBusActivos, BusInactivo, setBusInactivos, setReloadBus } = props;
    const [VerBusActivo, setVerBusActivo] = useState(true);
    const [IsVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [BusquedaBusActivo, setBusquedaBusA] = useState(false);
    const [BusquedaBusInactivo, setBusquedaBusI] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [BotonesPaginacion, setBotonesPaginacion] = useState(true);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(4);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 4;

    /* Modal para agregar buses */
    const AgregarUsuarioModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Agregar nuevo Bus");
        setModalContent(
            <AddBus
                setIsVisibleModal={setIsVisibleModal}
                setReloadBus={setReloadBus}
            />
        );
    };
    /* Buscar buses */
    const Buscar = Numero => {
        setBusquedaBusA(BusActivo);
        setBusquedaBusI(BusInactivo);
        if (Numero === "" || Numero === " ") {
          setBusquedaBusA(BusActivo);
          setBusquedaBusI(BusInactivo);
        } else {
            ObtenerBusNumero(token, Numero, true)
            .then(response => {
              setBusquedaBusA(response.bus)
            })
            .catch(err => {
              notification["error"]({
                message: err
              });
            });
            ObtenerBusNumero(token, Numero, false)
            .then(response => {
              setBusquedaBusI(response.bus)
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
        <div className="list-bus">
            <div className="list-bus__header">
                <div className="list-bus__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => { setVerBusActivo(!VerBusActivo); setpaginaActual(1); setDesde(0); setLimite(4); setBotonesPaginacion(!BotonesPaginacion) }}
                    />
                    <span id="UActivos" >
                        {VerBusActivo ? "Buses Activos" : "Buses Inactivos"}
                    </span>
                </div>

                {/* Buscar buses */}
                <div className="form-edit">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Buscar numero de Bus"
                        onChange={
                            event => Buscar(event.target.value)
                        }
                    />
                </div>
                {/* .............. */}

                <Button type="primary" onClick={AgregarUsuarioModal}>
                    Nuevo Bus
          </Button>
            </div>

            {/* listado de buses activos e inactivos */}
            {VerBusActivo ? (
                <LBusActivo
                    busActivo={BusquedaBusActivo ? BusquedaBusActivo : BusActivo}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setReloadBus={setReloadBus}
                    setModalContent={setModalContent} />) : (
                <LBusInactivo BusInactivo={BusquedaBusInactivo ? BusquedaBusInactivo : BusInactivo} setReloadBus={setReloadBus} />)}

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
          setBusActivos={setBusActivos} 
          desde={desde} 
          setDesde={setDesde}
          limite={limite}
          setBusInactivos= {setBusInactivos}
          NumeroPorPagina={NumeroPorPagina} /> :
          <PaginacionI 
          paginaActual={paginaActual}
          setpaginaActual={setpaginaActual} 
          token={token} 
          setBusActivos={setBusActivos} 
          desde={desde} 
          setDesde={setDesde}
          limite={limite}
          setBusInactivos= {setBusInactivos}
          NumeroPorPagina={NumeroPorPagina} />
          }
        </div>
        </div>
    );
}

  function PaginacionA(props) {
    const { paginaActual, setpaginaActual, token, setBusActivos, desde, setDesde, limite, setBusInactivos, NumeroPorPagina } = props;
    useEffect(() => {
        ObtenerBus(token, true, desde, limite).then(response => {
        setBusActivos(response.bus);
        if((response.bus).length < NumeroPorPagina){
          document.getElementById('siguiente').disabled=true;
        }
      });
    }, [desde, limite, token, setBusActivos, setDesde, setBusInactivos, NumeroPorPagina]);
  
    const Siguiente = () => {
      var PA = paginaActual + 1
      setpaginaActual(PA)
      setDesde(desde + limite);
      document.getElementById('anterior').disabled=false;
    }
  
    const Atras = () => {
      if (paginaActual > 1) {
        var PA = paginaActual - 1
        setpaginaActual(PA)
        setDesde(desde - limite);
        document.getElementById('siguiente').disabled=false;
      }
      if(paginaActual === 1){
        document.getElementById('anterior').disabled=true;
      }
    }
  
    return (
      <div>
        <Button id = 'anterior' className="centradoB" type="primary" onClick={Atras}>
          Anterior
        </Button>
        <Button className="centradoB" type="second">
          {paginaActual}
        </Button>
  
        <Button id = 'siguiente' className="centradoB" type="primary" onClick={Siguiente}>
          Siguiente
        </Button>
      </div>
    )
  }

/* Mostrar 4 siguientes buses Inactivos */
  function PaginacionI(props) {
    const { paginaActual, setpaginaActual, token, setBusActivos, desde, setDesde, limite, setBusInactivos, NumeroPorPagina } = props;
    useEffect(() => {
      ObtenerBus(token, false, desde, limite).then(response => {
        setBusInactivos(response.bus);
        if((response.bus).length < NumeroPorPagina){
          document.getElementById('siguiente').disabled=true;
        }
      });
    }, [desde, limite, token, setBusActivos, setDesde, setBusInactivos, NumeroPorPagina]);
  
    const Siguiente = () => {
      var PA = paginaActual + 1
      setpaginaActual(PA)
      setDesde(desde + limite);
      document.getElementById('anterior').disabled=false;
    }
  
    const Atras = () => {
      if (paginaActual > 1) {
        var PA = paginaActual - 1
        setpaginaActual(PA)
        setDesde(desde - limite);
        document.getElementById('siguiente').disabled=false;
      }
      if(paginaActual === 1){
        document.getElementById('anterior').disabled=true;
      }
    }
  
    return (
      <div>
        <Button id = 'anterior' className="centradoB" type="primary" onClick={Atras}>
          Anterior
        </Button>
        <Button className="centradoB" type="second">
          {paginaActual}
        </Button>
  
        <Button id = 'siguiente' className="centradoB" type="primary" onClick={Siguiente}>
          Siguiente
        </Button>
      </div>
    )
  }

/* Metodo para llamar a los buses activos */
function LBusActivo(props) {
    const { busActivo, setIsVisibleModal, setModalTitle, setModalContent, setReloadBus } = props;
    /* Metodo para activar modal y editar buses*/
    const EditarBus = bus => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Bus Número: 
      ${bus.numero_bus ? bus.numero_bus : '...'}`);
        setModalContent(<EditBusForm
        bus={bus}
        setIsVisibleModal={setIsVisibleModal}
        setReloadBus={setReloadBus} /> )
    }

    return (
        <List
            className="bus-active"
            itemLayout="horizontal"
            dataSource={busActivo}
            renderItem={
                bus => <ListaBusActivos
                    bus={bus}
                    Editarbus={EditarBus}
                    setReloadBus={setReloadBus} />}
        />

    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaBusActivos(props) {
    const { bus, Editarbus, setReloadBus } = props;

    const desactivarBus = () => {
        const accesToken = getAccessTokenApi();

        ActivarBus(accesToken, bus._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadBus(true);
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
            title: "Eliminando Bus",
            content: `¿Esta seguro que desea eliminar el Bus Numero:  ${bus.numero_bus}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                EliminarBus(accesToken, bus._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadBus(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
            }
        });
    }; */

    return (
        <List.Item
            actions={[
                <Tooltip title="Editar">
                    <Button type="primary" onClick={() => Editarbus(bus)} >
                        <EditOutlined />
                    </Button>
                </Tooltip>,

                <Tooltip title="Desactivar">
                    <Button type="danger" onClick={() => desactivarBus()}>
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
                avatar={<Avatar src={NoAvatar} />}
                title={`Bus Número: 
              ${bus.numero_bus ? bus.numero_bus : '...'}
           ` }
                description={
                    <div>
                        <b>Dueño: </b><b> {bus.id_persona.nombre_persona ? bus.id_persona.nombre_persona : '...'} {bus.id_persona.apellido_persona ? bus.id_persona.apellido_persona : '...'} </b>
                        <br />
                        <b>Cédula: </b> {bus.id_persona.cedula_persona ? bus.id_persona.cedula_persona : '...'}
                        <br />
                        <b>Dirección: </b> {bus.id_persona.direccion_persona ? bus.id_persona.direccion_persona : '...'}
                        <br />
                        <b>Celular: </b> {bus.id_persona.celular_persona ? bus.id_persona.celular_persona : '...'}
                        <br />
                        <b>Placas: </b> {bus.placa_bus ? bus.placa_bus : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

/* Metodo para llamar a los usuarios inactivos */
function LBusInactivo(props) {
    const { BusInactivo, setReloadBus } = props
    return (
        <List
            className="bus-active"
            itemLayout="horizontal"
            dataSource={BusInactivo}
            renderItem={bus => (<ListaBusInactivos bus={bus} setReloadBus={setReloadBus} />)}
        />
    );
}

/* Metodo que muesta los datos dento de la lista */
function ListaBusInactivos(props) {
    const { bus, setReloadBus } = props;

    const activarBus = () => {
        const accesToken = getAccessTokenApi();

        ActivarBus(accesToken, bus._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadBus(true);
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
            title: "Eliminando Bus",
            content: `¿Esta seguro que desea eliminar el Bus Numero:  ${bus.numero_bus}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                EliminarBus(accesToken, bus._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadBus(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
            }
        });
    }; */

    return (
        <List.Item
            actions={[
                <Tooltip title="Activar">
                    <Button type="primary" onClick={() => activarBus()}>
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
                title={`Bus Número: 
              ${bus.numero_bus ? bus.numero_bus : '...'}
           ` }
                description={
                    <div>
                        <b>Dueño: </b><b> {bus.id_persona.nombre_persona ? bus.id_persona.nombre_persona : '...'} {bus.id_persona.apellido_persona ? bus.id_persona.apellido_persona : '...'} </b>
                        <br />
                        <b>Cédula: </b> {bus.id_persona.cedula_persona ? bus.id_persona.cedula_persona : '...'}
                        <br />
                        <b>Dirección: </b> {bus.id_persona.direccion_persona ? bus.id_persona.direccion_persona : '...'}
                        <br />
                        <b>Celular: </b> {bus.id_persona.celular_persona ? bus.id_persona.celular_persona : '...'}
                        <br />
                        <b>Placas: </b> {bus.placa_bus ? bus.placa_bus : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

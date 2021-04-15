import React, { useState, useEffect } from "react";
import { Switch, List, Input, Avatar, Button, Tooltip, notification /* Modal as ModalAntd */ } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { EditOutlined, StopOutlined, /* DeleteOutlined */ CheckOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import { ObtenerAvatar, ActivarUsuario, /* EliminarUsuario */ ObtenerUsuariosNombreA, ObtenerUsuariosNombreI, ObtenerUsuariosAI } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import AddUserForm from "../AddUserForm";

import "./ListUsers.scss";
/* 
const { confirm } = ModalAntd; */

export default function ListUsers(props) {
  const { usuarioActivo, setusuariosActivos, usuarioInactivo, setusuariosInactivos, rol, setReloadUsers } = props;
  const [VerUsuariosActivos, setVerUsuariosActivos] = useState(true);
  const [IsVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [BusquedaUsuarioActivo, setBusquedaUsuarioA] = useState(false);
  const [BusquedaUsuarioInactivo, setBusquedaUsuarioI] = useState(false);
  const [NombreUSuario, setNombreUsuario] = useState(" ");
  const [paginaActual, setpaginaActual] = useState(1);
  const [BotonesPaginacion, setBotonesPaginacion] = useState(true);
  const [desde, setDesde] = useState(0);
  const [limite, setLimite] = useState(4);
  const token = getAccessTokenApi();
  const NumeroPorPagina = 4;

  /* Obtener los nombres de los usuarios para la busqueda */
  useEffect(() => {
    if (NombreUSuario === "" || NombreUSuario === " ") {
      setBusquedaUsuarioA(usuarioActivo);
      setBusquedaUsuarioI(usuarioInactivo);
    } else {
      ObtenerUsuariosNombreA(token, NombreUSuario)
        .then(response => {
          setBusquedaUsuarioA(response.usuario)
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
      ObtenerUsuariosNombreI(token, NombreUSuario)
        .then(response => {
          setBusquedaUsuarioI(response.usuario)
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  }, [token, NombreUSuario, usuarioActivo, usuarioInactivo]);

  /* Modal para agregar usuario */
  const AgregarUsuarioModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Agregar nuevo Usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
        rol={rol}
      />
    );
  };

  /* Buscar usuarios */
  const Buscar = nombre => {
    setNombreUsuario(nombre);
    setBusquedaUsuarioA(usuarioActivo);
    setBusquedaUsuarioI(usuarioInactivo);
    if (nombre === "" || nombre === " ") {
      setBusquedaUsuarioA(usuarioActivo);
      setBusquedaUsuarioI(usuarioInactivo);
    } else {
      ObtenerUsuariosNombreA(token, nombre)
        .then(response => {
          setBusquedaUsuarioA(response.usuario)
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
      ObtenerUsuariosNombreI(token, nombre)
        .then(response => {
          setBusquedaUsuarioI(response.usuario)
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  }

  return (
    /* switch y boton agregar usuario */
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => { setVerUsuariosActivos(!VerUsuariosActivos); setpaginaActual(1); setDesde(0); setLimite(4); setBotonesPaginacion(!BotonesPaginacion) }}
          />
          <span id= "UActivos" >
            {VerUsuariosActivos ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>

        {/* Buscar Usuario */}
        <div className="form-edit">
          <Input
            prefix={<SearchOutlined />}
            placeholder=" Buscar nombre de usuario"
            onChange={
              event => Buscar(event.target.value)
            }
          />
        </div>
        {/* .............. */}

        <Button type="primary" onClick={AgregarUsuarioModal}>
          Nuevo Usuario
        </Button>
      </div>

      {/* listado de usuarios activos e inactivos */}
      {VerUsuariosActivos ? (
        <UsuarioActivo
          usuarioActivo={BusquedaUsuarioActivo ? BusquedaUsuarioActivo : usuarioActivo}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setReloadUsers={setReloadUsers}
          rol={rol}
          setModalContent={setModalContent} />) : (
        <UsuarioInactivo usuarioInactivo={BusquedaUsuarioInactivo ? BusquedaUsuarioInactivo : usuarioInactivo} setReloadUsers={setReloadUsers} />)}

      {/* Modal para editar */}
      <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>

      {/* Paginacion de los usuarios Activos  */}
      <div className="centradoL">
        {BotonesPaginacion ?
        <PaginacionA 
        paginaActual={paginaActual}
        setpaginaActual={setpaginaActual} 
        token={token} 
        setusuariosActivos={setusuariosActivos} 
        desde={desde} 
        setDesde={setDesde}
        limite={limite}
        setLimite={setLimite}
        setusuariosInactivos= {setusuariosInactivos}
        NumeroPorPagina={NumeroPorPagina} /> :
        <PaginacionI 
        paginaActual={paginaActual}
        setpaginaActual={setpaginaActual} 
        token={token} 
        setusuariosActivos={setusuariosActivos} 
        desde={desde} 
        setDesde={setDesde}
        limite={limite}
        setLimite={setLimite}
        setusuariosInactivos= {setusuariosInactivos}
        NumeroPorPagina={NumeroPorPagina} />
        }
      </div>
    </div>
  );
}

/* Mostrar 4 siguientes usuarios Activos */
function PaginacionA(props) {
  const { paginaActual, setpaginaActual, token, setusuariosActivos, desde, setDesde, limite, setusuariosInactivos, NumeroPorPagina } = props;
  useEffect(() => {
    ObtenerUsuariosAI(token, true, desde, limite).then(response => {
      setusuariosActivos(response.usuario);
      if((response.usuario).length < NumeroPorPagina){
        document.getElementById('siguiente').disabled=true;
      }
    });
  }, [desde, limite, token, setusuariosActivos, setDesde, setusuariosInactivos, NumeroPorPagina]);

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

/* Mostrar 4 siguientes usuarios Inactivos */
function PaginacionI(props) {
  const { paginaActual, setpaginaActual, token, setusuariosActivos, desde, setDesde, limite, setusuariosInactivos, NumeroPorPagina } = props;
  useEffect(() => {
    ObtenerUsuariosAI(token, false, desde, limite).then(response => {
      setusuariosInactivos(response.usuario);
      if((response.usuario).length < NumeroPorPagina){
        document.getElementById('siguiente').disabled=true;
      }
    });
  }, [desde, limite, token, setusuariosActivos, setDesde, setusuariosInactivos, NumeroPorPagina]);

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

/* Metodo para llamar a los usuarios activos */
function UsuarioActivo(props) {
  const { usuarioActivo, setIsVisibleModal, setModalTitle, setModalContent, rol, setReloadUsers } = props;
  /* Metodo para activar modal y editar usuario, llamada a EditUserForm */
  const EditarUsuario = usuario => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: 
    ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
    ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}`);
    setModalContent(<EditUserForm
      usuario={usuario}
      rol={rol}
      setIsVisibleModal={setIsVisibleModal}
      setReloadUsers={setReloadUsers} />)
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioActivo}
      renderItem={
        usuario => <ListaUsuariosActivos
          usuario={usuario}
          EditarUsuario={EditarUsuario}
          setReloadUsers={setReloadUsers} />}
    />

  );
}

/* Metodo que muesta los datos dento de la lista */
function ListaUsuariosActivos(props) {
  const { usuario, EditarUsuario, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (usuario.avatar) {
      ObtenerAvatar(usuario.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [usuario]);

  const desactivarUsuario = () => {
    const accesToken = getAccessTokenApi();

    ActivarUsuario(accesToken, usuario._id, false)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

/*   const ConfirmarEliminar = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Esta seguro que desea eliminar a ${usuario.nombre_usuario}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        EliminarUsuario(accesToken, usuario._id)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
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
          <Button type="primary" onClick={() => EditarUsuario(usuario)} >
            <EditOutlined />
          </Button>
        </Tooltip>,

        <Tooltip title="Desactivar">
          <Button type="danger" onClick={() => desactivarUsuario()}>
            <StopOutlined />
          </Button>
        </Tooltip>,

/*         <Tooltip title="Eliminar">
          <Button type="danger" onClick={() => ConfirmarEliminar()}>
            <DeleteOutlined />
          </Button></Tooltip> */
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
            ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
            ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}
         ` }
        description={
          <div>
            <b> {usuario.nombre_usuario ? usuario.nombre_usuario : '...'} : {usuario.id_rol.nombre ? usuario.id_rol.nombre : '...'} </b>
            <br />
            <b>Cédula:</b> {usuario.id_persona.cedula_persona ? usuario.id_persona.cedula_persona : '...'}
            <br />
            <b>Correo:</b> {usuario.correo ? usuario.correo : '...'}
            <br />
            <b>Contacto:</b> {usuario.id_persona.celular_persona ? usuario.id_persona.celular_persona : '...'}
          </div>
        }
      />
    </List.Item>
  );
}

/* Metodo para llamar a los usuarios inactivos */
function UsuarioInactivo(props) {
  const { usuarioInactivo, setReloadUsers } = props
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioInactivo}
      renderItem={usuario => (<ListaUsuariosInactivos usuario={usuario} setReloadUsers={setReloadUsers} />)}
    />
  );
}

/* Metodo que muesta los datos dento de la lista */
function ListaUsuariosInactivos(props) {
  const { usuario, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (usuario.avatar) {
      ObtenerAvatar(usuario.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [usuario]);

  const activarUsuario = () => {
    const accesToken = getAccessTokenApi();

    ActivarUsuario(accesToken, usuario._id, true)
      .then(response => {
        notification["success"]({
          message: response
        });
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({
          message: err
        });
      });
  };

/*   const ConfirmarEliminar = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Esta seguro que desea eliminar a ${usuario.nombre_usuario}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        EliminarUsuario(accesToken, usuario._id)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
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
          <Button type="primary" onClick={() => activarUsuario()}>
            <CheckOutlined />
          </Button>
        </Tooltip>,
/*         <Tooltip title="Eliminar">
          <Button type="danger" onClick={() => ConfirmarEliminar()}>
            <DeleteOutlined />
          </Button>
        </Tooltip> */
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
                  ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}
               ` }
        description={
          <div>
            <b>{usuario.nombre_usuario ? usuario.nombre_usuario : '...'} : {usuario.id_rol.nombre ? usuario.id_rol.nombre : '...'} </b>
            <br />
            <b>Cédula:</b> {usuario.id_persona.cedula_persona ? usuario.id_persona.cedula_persona : '...'}
            <br />
            <b>Correo:</b> {usuario.correo ? usuario.correo : '...'}
            <br />
            <b>Contacto:</b> {usuario.id_persona.celular_persona ? usuario.id_persona.celular_persona : '...'}
          </div>
        }
      />
    </List.Item>
  );
}

import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, Tooltip, notification, Modal as ModalAntd } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import { ObtenerAvatar, ActivarUsuario, EliminarUsuario, CrearUsuario } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import AddUserForm from "../AddUserForm";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usuarioActivo, usuarioInactivo, rol, setReloadUsers } = props;
  const [VerUsuariosActivos, setVerUsuariosActivos] = useState(true);
  const [IsVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const AgregarUsuarioModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Agregar nuevo Usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
        rol = {rol}
      />
    );
  };


  return (
    
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setVerUsuariosActivos(!VerUsuariosActivos)}
          />
          <span>
            {VerUsuariosActivos ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type="primary" onClick={AgregarUsuarioModal}>
          Nuevo Usuario
        </Button>
      </div>
      {VerUsuariosActivos ? (
        <UsuarioActivo
          usuarioActivo={usuarioActivo}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setReloadUsers={setReloadUsers}
          rol={rol}
          setModalContent={setModalContent} />) : (
        <UsuarioInactivo usuarioInactivo={usuarioInactivo} setReloadUsers={setReloadUsers} />)}
      <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

function UsuarioActivo(props) {

  const { usuarioActivo, setIsVisibleModal, setModalTitle, setModalContent, rol, setReloadUsers } = props

  const EditarUsuario = usuario => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: 
    ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
    ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}`);
    setModalContent(<EditUserForm usuario={usuario} rol={rol} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />)
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioActivo}
      renderItem={
        usuario => <UsuarioActivoAvatar
          usuario={usuario}
          EditarUsuario={EditarUsuario}
          setReloadUsers={setReloadUsers} />}
    />
  );
}

function UsuarioActivoAvatar(props) {
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

  const ConfirmarEliminar = () => {
  const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${usuario.nombre_usuario}?`,
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
  };

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

        <Tooltip title="Eliminar">
          <Button type="danger" onClick={() => ConfirmarEliminar()}>
            <DeleteOutlined />
          </Button></Tooltip>
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
            <b> {usuario.id_rol.nombre ? usuario.id_rol.nombre : '...'} : {usuario.nombre_usuario ? usuario.nombre_usuario : '...'} </b>
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

function UsuarioInactivo(props) {
  const { usuarioInactivo, setReloadUsers } = props
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioInactivo}
      renderItem={usuario => (<UsuarioInactivoAvatar usuario={usuario} setReloadUsers={setReloadUsers} />)}
    />
  );
}

function UsuarioInactivoAvatar(props) {
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

  const ConfirmarEliminar = () => {
    const accesToken = getAccessTokenApi();
  
      confirm({
        title: "Eliminando usuario",
        content: `¿Estas seguro que quieres eliminar a ${usuario.nombre_usuario}?`,
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
    };

  return (
    <List.Item
      actions={[
        <Tooltip title="Activar">
          <Button type="primary" onClick={() => activarUsuario()}>
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
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
                  ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}
               ` }
        description={
          <div>
            <b> {usuario.id_rol.nombre ? usuario.id_rol.nombre : '...'} : {usuario.nombre_usuario ? usuario.nombre_usuario : '...'} </b>
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

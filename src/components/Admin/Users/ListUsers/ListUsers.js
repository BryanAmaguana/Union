import React, { useState , useEffect} from "react";
import { Switch, List, Avatar, Button, Tooltip } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import {ObtenerAvatar} from "../../../../api/user";


import "./ListUsers.scss";


export default function ListUsers(props) {
  const { usuarioActivo, usuarioInactivo, rol } = props;
  const [VerUsiariosActivos, setVerUsuariosActivos] = useState(true);
  const [IsVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle]= useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setVerUsuariosActivos(!VerUsiariosActivos)}
          />
          <span>
            {VerUsiariosActivos ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
      </div>
      {VerUsiariosActivos ? (
      <UsuarioActivo 
      usuarioActivo={usuarioActivo} 
      setIsVisibleModal={setIsVisibleModal}
      setModalTitle = {setModalTitle}
      rol = {rol}
      setModalContent = {setModalContent}/>) : (
      <UsuarioInactivo usuarioInactivo={usuarioInactivo}/>)}
      <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

function UsuarioActivo(props) {

  const { usuarioActivo, setIsVisibleModal, setModalTitle, setModalContent, rol } = props
  
  const EditarUsuario = usuario =>{
    setIsVisibleModal(true);
    setModalTitle(`Editar: ${usuario.id_persona.apellido_persona ? usuario.id_persona.apellido_persona : '...'}
    ${usuario.id_persona.nombre_persona ? usuario.id_persona.nombre_persona : '...'}`);
    setModalContent(<EditUserForm usuario = {usuario} rol = {rol}/>)
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioActivo}
      renderItem={usuario => <UsuarioActivoAvatar usuario={usuario} EditarUsuario={EditarUsuario}/>}
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

  /* const desactivateUser = () => {
    const accesToken = getAccessTokenApi();

    activateUserApi(accesToken, Usuario._id, false)
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

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${Usuario.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, Usuario._id)
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
        <Button type="danger" onClick={() => console.log("Desactivar Usuario")}>
          <StopOutlined />
        </Button>
      </Tooltip>,

      <Tooltip title="Eliminar">
        <Button type="danger" onClick={() => console.log("Eliminar Usuario")}>
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
  const { usuarioInactivo } = props
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioInactivo}
      renderItem={usuario => (  <UsuarioInactivoAvatar usuario={usuario}/>)}
    />
  );
}

function UsuarioInactivoAvatar(props){
  const { usuario } = props;
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

  return(
    <List.Item
          actions={[
            <Tooltip title="Activar">
              <Button type="primary" onClick={() => console.log("Activar Usuario")}>
                <CheckOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="Eliminar">
              <Button type="danger" onClick={() => console.log("Eliminar Usuario")}>
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

import React, { useState } from "react";
import { Switch, List, Avatar, Button, Tooltip } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";


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
      <UsersActive 
      usuarioActivo={usuarioActivo} 
      setIsVisibleModal={setIsVisibleModal}
      setModalTitle = {setModalTitle}
      rol = {rol}
      setModalContent = {setModalContent}/>) : (
      <UsersInactive usuarioInactivo={usuarioInactivo}/>)}
      <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {

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
      renderItem={usuario => (
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
            avatar={<Avatar src={usuario.avatar ? usuario.avatar : NoAvatar} />}
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
      )}
    />
  );
}

function UsersInactive(props) {
  const { usuarioInactivo } = props
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usuarioInactivo}
      renderItem={usuario => (
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
            avatar={<Avatar src={usuario.avatar ? usuario.avatar : NoAvatar} />}
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
      )}
    />
  );
}

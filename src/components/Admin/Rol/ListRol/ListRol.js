import React, { useState } from "react";
import { List, Button, Tooltip, Modal as ModalAntd } from "antd";
import { EditOutlined } from '@ant-design/icons';
import Modal from "../../../Modal";
import EditRolForm from "../EditRol";
import AddRolForm from "../AddRol"

import "./ListRol.scss";

export default function ListUsers(props) {
  const { rol, setReloadRol } = props;
  const [IsVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  /* Agregar Rol */
  const AgregarRolModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Agregar nuevo Rol");
    setModalContent(
      <AddRolForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadRol={setReloadRol}
        rol={rol}
      />
    );
  };

  return (
    <div className="list-rol">
      <div className="list-rol__header">
        <Button type="primary" onClick={AgregarRolModal}>
          Nuevo Rol
            </Button>
      </div>
      {/* lista de roles */}
      <Roles
        rol={rol}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadRol={setReloadRol} />
      {/* Modal para editar */}
      <Modal title={modalTitle} isVisible={IsVisibleModal} setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

/* Metodo para llamar a los roles */
function Roles(props) {
  const { rol, setIsVisibleModal, setModalTitle, setModalContent, setReloadRol } = props;
  /* Metodo para activar modal y editar usuario, llamada a EditUserForm */
  const EditarRol = rol => {
    setIsVisibleModal(true);
    setModalTitle(`Editar Rol : 
      ${rol.nombre ? rol.nombre : '...'}`);
    setModalContent(<EditRolForm
      rol={rol}
      setIsVisibleModal={setIsVisibleModal}
      setReloadRol={setReloadRol} />)
  }

  return (
    <List
      className="rol-active"
      itemLayout="horizontal"
      dataSource={rol}
      renderItem={
        rol => <ListaRol
          rol={rol}
          EditarRol={EditarRol}/>}
    />

  );
}


/* Metodo que muesta los datos dento de la lista */
function ListaRol(props) {
  const { rol, EditarRol } = props;

  return (
    <List.Item
      actions={[
        <Tooltip title="Editar">
          <Button type="primary" onClick={() => EditarRol(rol)} >
            <EditOutlined />
          </Button>
        </Tooltip>
      ]}
    >
      <List.Item.Meta
        title={` ${rol.nombre ? rol.nombre : '...'} `}
        description={
          <div>
            <b>Descripción: </b>{rol.descripcion ? rol.descripcion : '...'}
          </div>
        }
      />
    </List.Item>
  );
}
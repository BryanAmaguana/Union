import React, { useState, useEffect } from "react";
import { Switch, List, Button, Avatar, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import Modal from "../../../Modal";
import NoAvatar from "../../../../assets/img/png/Fondo.png";
import DragSortableList from "react-drag-sortable";
import { ActualizarContenidoApi, ActivarContenidoApi, deleteContenidoApi, ObtenerFondo } from "../../../../api/contenidoWeb";
import { getAccessTokenApi } from "../../../../api/auth";
import AddContenidoForm from "../AddContenidoWeb";
import EditContenidoForm from "../EditContenidoWeb";

import "./ListContenidoWeb.scss";

const { confirm } = ModalAntd;

export default function ListContenidoWeb(props) {
    const {ContenidoWeb, setReloadContenidoWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];
        ContenidoWeb.forEach(item => {
            listItemsArray.push({
                content: (
                    <ContenidoItem
                        item={item}
                        ActivarContenido={ActivarContenido}
                        editConteidoWebModal={editConteidoWebModal}
                        deleteContenido={deleteContenido}
                    />
                )
            });
        });
        setListItems(listItemsArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContenidoWeb]);

    const ActivarContenido = (contenido, status) => {
        const accesToken = getAccessTokenApi();
        ActivarContenidoApi(accesToken, contenido._id, status).then(response => {
            notification["success"]({
                message: response
            });
        });
    };

    const OrdenarLista = (sortedList, dropEvent) => {
        const accesToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            ActualizarContenidoApi(accesToken, _id, { order });
        });
    };

    const addContenidoWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo Contenido");
        setModalContent(
            <AddContenidoForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadContenidoWeb={setReloadContenidoWeb}
            />
        );
    };

    const deleteContenido = contenido => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando Contenido",
            content: `¿Estas seguro que desea eliminar el Contenido ${contenido.titulo}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteContenidoApi(accesToken, contenido._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadContenidoWeb(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error del servidor, intentelo más tarde."
                        });
                    });
            }
        });
    };

    const editConteidoWebModal = contenido => {
        setIsVisibleModal(true);
        setModalTitle(`Editando Contenido: ${contenido.titulo}`);
        setModalContent(
            <EditContenidoForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadContenidoWeb={setReloadContenidoWeb}
                contenido={contenido}
            />
        );
    };

    return (
        <div className="contenido-web-list">
            <div className="contenido-web-list__header">
                <Button type="primary" onClick={addContenidoWebModal}>
                    Crear Contenido
                </Button>
            </div>

            <div className="contenido-web-list__items">
                <DragSortableList items={listItems} onSort={OrdenarLista} type="vertical" />
            </div>

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function ContenidoItem(props) {
    const { item, ActivarContenido, editConteidoWebModal, deleteContenido } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (item.fondo) {
          ObtenerFondo(item.fondo).then(response => {
            setAvatar(response);
          });
        } else {
          setAvatar(null);
        }
      }, [item]);

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={item.disponible}
                    onChange={e => ActivarContenido(item, e)}
                />,
                <Button type="primary" onClick={() => editConteidoWebModal(item)}>
                    <EditOutlined />
                </Button>,
                <Button type="danger" onClick={() => deleteContenido(item)}>
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta 
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={item.titulo} description={item.contenido} />
        </List.Item>
    );
}
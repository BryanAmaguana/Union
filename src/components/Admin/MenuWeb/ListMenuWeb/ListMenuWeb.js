import React, { useState, useEffect } from "react";
import { Switch, List, Button /* Modal as ModalAntd */, notification } from "antd";
import { EditOutlined /* DeleteOutlined */  } from '@ant-design/icons';
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { ActualizarMenuApi, ActivarMenuApi /* deleteMenuApi  */} from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuWebForm from "../AddMenuWeb";
import EditMenuWebForm from "../EditMenuWeb";

import "./ListMenuWeb.scss";

/* const { confirm } = ModalAntd; */

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];
        menu.forEach(item => {
            listItemsArray.push({
                content: (
                    <MenuItem
                        item={item}
                        activateMenu={activateMenu}
                        editMenuWebModal={editMenuWebModal}
                        /* deleteMenu={deleteMenu} */
                    />
                )
            });
        });
        setListItems(listItemsArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu]);

    const activateMenu = (menu, status) => {
        const accesToken = getAccessTokenApi();
        ActivarMenuApi(accesToken, menu._id, status).then(response => {
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
            ActualizarMenuApi(accesToken, _id, { order });
        });
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menú");
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

/*     const deleteMenu = menu => {
        const accesToken = getAccessTokenApi();

        confirm({
            title: "Eliminando menu",
            content: `¿Estas seguro que desea eliminar el menu ${menu.titulo}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteMenuApi(accesToken, menu._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadMenuWeb(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error del servidor, intentelo más tarde."
                        });
                    });
            }
        });
    }; */

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menu: ${menu.titulo}`);
        setModalContent(
            <EditMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        );
    };

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>
                    Crear menú
                </Button>
            </div>

            <div className="menu-web-list__items">
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

function MenuItem(props) {
    const { item, activateMenu, editMenuWebModal/*  deleteMenu */ } = props;

    return (
        <List.Item
            actions={[
                <Switch
                    defaultChecked={item.disponible}
                    onChange={e => activateMenu(item, e)}
                />,
                <Button type="primary" onClick={() => editMenuWebModal(item)}>
                    <EditOutlined />
                </Button>,
/*                 <Button type="danger" onClick={() => deleteMenu(item)}>
                    <DeleteOutlined />
                </Button> */
            ]}
        >
            <List.Item.Meta title={item.titulo} description={item.url} />
        </List.Item>
    );
}
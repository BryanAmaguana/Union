import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { LinkOutlined, TagOutlined   } from '@ant-design/icons';
import { ActualizarMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditMenuWeb.scss";

export default function EditMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
  const [menuWebData, setMenuWebData] = useState(menu);

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const EditarMenu = event => {
    event.preventDefault();

    if (!menuWebData.titulo || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else {
      const accesToken = getAccessTokenApi();

      ActualizarMenuApi(accesToken, menuWebData._id, menuWebData)
        .then(response => {
          notification["success"]({
            message: response
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          });
        });
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        editMenu={EditarMenu}
      />
    </div>
  );
}

function EditForm(props) {
  const { menuWebData, setMenuWebData, editMenu } = props;

  return (
    <Form className="form-edit" onSubmitCapture={editMenu}>
      <Form.Item>
        <Input
          prefix={<TagOutlined />}
          placeholder="Titulo"
          value={menuWebData.titulo}
          onChange={e =>
            setMenuWebData({ ...menuWebData, titulo: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar menú
        </Button>
      </Form.Item>
    </Form>
  );
}
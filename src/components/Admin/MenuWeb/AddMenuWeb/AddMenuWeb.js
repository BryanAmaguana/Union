import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { AgregarMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import { TagOutlined  } from '@ant-design/icons';

import "./AddMenuWeb.scss";

export default function AddMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({});

  const AgregarMenu = event => {
    event.preventDefault();
    let finalData = {
      titulo: menuWebData.titulo,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
    };

    if (!finalData.titulo || !finalData.url || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.disponible = true;
      finalData.order = 1000;

      AgregarMenuApi(accessToken, finalData)
        .then(response => {
          notification["success"]({
            message: response
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor."
          });
        });
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        AgregarMenu={AgregarMenu}
      />
    </div>
  );
}

function AddForm(props) {
  const { menuWebData, setMenuWebData, AgregarMenu } = props;
  const { Option } = Select;

  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={e => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add" onSubmitCapture={AgregarMenu}>
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
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar menú
        </Button>
      </Form.Item>
    </Form>
  );
}
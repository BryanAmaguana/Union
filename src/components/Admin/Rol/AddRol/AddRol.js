import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { CrearRol } from "../../../../api/rol";
import { getAccessTokenApi } from "../../../../api/auth";
import { InfoCircleOutlined, IdcardOutlined } from '@ant-design/icons';

import "./AddRol.scss";

export default function EditRolForm(props) {
  const { setIsVisibleModal, setReloadRol, rol } = props;
  const [RolData, setRolData] = useState({});

  const addRol = event => {
    event.preventDefault();
    if (
      !RolData.nombre ||
      !RolData.descripcion
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });

    } else {
      const accesToken = getAccessTokenApi();
      CrearRol(accesToken, RolData)
        .then(response => {
          if (response === "Rol creado exitosamente.") {
            notification["success"]({
              message: response
            });
            setRolData({});
            setIsVisibleModal(false);
            setReloadRol(true);
          } else {
            notification["error"]({
              message: response
            });
          }
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  };

  return (
    <div className="add-rol-form">
      <AddForm
        RolData={RolData}
        setRolData={setRolData}
        rol={rol}
        addRol={addRol}
        setReloadRol={setReloadRol}
      />
    </div>
  );
}

function AddForm(props) {
  const { RolData, setRolData, addRol } = props;
  return (
    <Form className="form-edit" onSubmitCapture={addRol}>


      <div className="navbarContenido">
        <div className="BuscadorContenido1" >
          <Input
            prefix={<IdcardOutlined />}
            placeholder="Nombre Rol"
            value={RolData.nombre}
            onChange={e =>
              setRolData({ ...RolData, nombre: e.target.value })
            }
          />
        </div>
      </div>

      <div className="navbarContenido">
        <div className="BuscadorContenido1" >
          <Input
            prefix={<InfoCircleOutlined />}
            placeholder="Descripción"
            value={RolData.descripcion}
            onChange={e =>
              setRolData({ ...RolData, descripcion: e.target.value })
            }
          />
        </div>
      </div>

      <Form.Item>
        <div className="navbarContenido">
          <Button type="primary" htmlType="submit" className="btn-submit">
            Agregar Rol
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
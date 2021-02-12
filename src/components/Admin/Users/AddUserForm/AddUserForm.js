import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification} from "antd";
import { CrearUsuario} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import "./AddUserForm.scss";

export default function EditUserForm(props) {
  const { setIsVisibleModal, setReloadUsers, rol } = props;
  const [userData, setUserData] = useState({});

  const addUser = event => {
    event.preventDefault();
    console.log("Crea usuario");
/*     if (
      !userData.nombre_usuario ||
      !userData.correo ||
      !userData.id_persona ||
      !userData.rol_Usuario ||
      !userData.fecha_registro_Usuario||
      !userData.contrasena ||
      !userData.Rcontrasena ||
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguale."
      });
    } else {
      const accesToken = getAccessTokenApi();

      CrearUsuario(accesToken, userData)
        .then(response => {
          notification["success"]({
            message: response
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    } */
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        rol={rol}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser, rol } = props;
  const { Option } = Select;
  return (
    <Form className="form-edit" onSubmitCapture={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre Usuario"
              value={userData.nombre_usuario}
              onChange={e =>
                setUserData({ ...userData, nombre_usuario: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo"
              value={userData.correo}
              onChange={e =>
                setUserData({ ...userData, correo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Seleccione una rol"
              onChange={e =>
                setUserData({ ...userData, id_rol: e })}
                value={userData.id_rol}
            >
              {rol.map((item) => {
                return <Option value={`${item._id}`}> {item.nombre} </Option>
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setUserData({ ...userData, contrasena: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setUserData({ ...userData, contrasenaR: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
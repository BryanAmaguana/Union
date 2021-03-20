import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification} from "antd";
import { CrearUsuario} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined, ContactsOutlined } from '@ant-design/icons';
import { ObtenerPersonaCedula } from "../../../../api/persona";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers, rol } = props;
  const [userData, setUserData] = useState({});
  const [persona, setPersona] = useState({});
  var f = new Date();

  const addUser = event => {
    event.preventDefault();
    userData.fecha_registro_Usuario = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()+"/" + f.getHours()+ ":"+ f.getMinutes()+":"+ f.getSeconds());
    userData.id_persona = persona._id;
    if (
      !userData.nombre_usuario ||
      !userData.correo ||
      !userData.id_persona ||
      !userData.id_rol ||
      !userData.fecha_registro_Usuario||
      !userData.contrasena ||
      !userData.contrasenaR
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });

    } else if (userData.contrasena !== userData.contrasenaR) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguale."
      });
    } else {
      const accesToken = getAccessTokenApi();
      CrearUsuario(accesToken, userData)
        .then(response => {
          if(response === "Usuario creado exitosamente."){
            notification["success"]({
              message: response
            });
            setUserData({});
            setPersona({});
            setIsVisibleModal(false);
            setReloadUsers(true);
          }else{
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
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        rol={rol}
        persona={persona}
        setPersona = {setPersona}
        addUser={addUser}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}


function AddForm(props) {
  const { persona, setPersona, userData, setUserData, addUser, rol, setReloadUsers } = props;
  const { Option } = Select;

  const accesToken = getAccessTokenApi();
  
  const PersonaCedula = (props) => {
    ObtenerPersonaCedula(accesToken, props).then(result => {
      if(result.message === "No se ha encontrado ninguna persona."){
        notification["error"]({
          message: result.message
        }); 
        setPersona({});
        setReloadUsers(true);
      }else{
        setPersona(result.persona);    
      }
    });
  }
    
  return (

    <Form className="form-edit" onSubmitCapture={addUser}>
      {/* ver los datos de la persona */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              id = 'Cedula'
              prefix={<UserAddOutlined />}
              maxLength="10"
              placeholder="Cédula de la persona"
              value={ persona.Vacio}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
        <Button type="primary" onClick={() => PersonaCedula(document.getElementById('Cedula').value !== "" ? document.getElementById('Cedula').value  : "11")} className="btn-submit">
          Buscar datos
        </Button>
      </Form.Item>
        </Col>
      </Row>

      {/* datos de la persona */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              disabled
              prefix={<ContactsOutlined />}
              placeholder="Nombre "
              value={ persona.nombre_persona}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              disabled
              prefix={<ContactsOutlined />}
              placeholder="Apellido"
              value={persona.apellido_persona}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre Usuario"
              value={userData.nombre_usuario}
              onChange={e =>
                setUserData({ ...userData, nombre_usuario: e.target.value, id_persona: persona._id  })
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
                setUserData({ ...userData, correo: e.target.value, id_persona: persona._id })
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
                return <Option key= {item._id.toString()} value={`${item._id}`}> {item.nombre} </Option>
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
              value={userData.contrasena}
              onChange={e =>
                setUserData({ ...userData, contrasena: e.target.value, id_persona: persona._id })
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
              value={userData.contrasenaR}
              onChange={e =>
                setUserData({ ...userData, contrasenaR: e.target.value, id_persona: persona._id })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
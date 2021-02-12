import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ObtenerAvatar } from "../../../../api/user"


import "./EditUserForm.scss"

export default function EditUserForm(props) {
  const { usuario, rol } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      avatar: usuario.avatar,
      id_rol: usuario.id_rol._id
    });
  }, [usuario]);


  useEffect(() => {
    if (usuario.avatar) {
      ObtenerAvatar(usuario.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [usuario]);


  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = e => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm usuario={usuario} userData={userData} setUserData={setUserData} updateUser={updateUser} rol={rol} />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);


  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}


function EditForm(props) {
  const { userData, setUserData, updateUser, rol } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmitCapture={updateUser}>
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
              placeholder="Seleccióna una rol"
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
                setUserData({ ...userData, contrasena: e.target.value })
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

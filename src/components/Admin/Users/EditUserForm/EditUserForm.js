import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Form, Input, Select, Button, notification } from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ObtenerAvatar, ActualizarAvatar, ActualizarUsuario } from "../../../../api/user"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditUserForm.scss"

export default function EditUserForm(props) {
  const { usuario, rol, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});


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

  useEffect(() => {
    setUserData({
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      contrasenaR: usuario.contrasenaR,
      id_rol: usuario.id_rol._id,
      avatar: usuario.avatar
    });
  }, [usuario]);

  const updateUser = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let UsuarioActualizado = userData;

    if (UsuarioActualizado.contrasena || UsuarioActualizado.contrasenaR) {
      if (UsuarioActualizado.contrasena !== UsuarioActualizado.contrasenaR) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales."
        });
        return;
      } else {
        delete UsuarioActualizado.contrasenaR;
      }
    }

    if (!UsuarioActualizado.nombre_usuario || !UsuarioActualizado.correo || !UsuarioActualizado.id_rol) {
      notification["error"]({
        message: "Nombre, Correo y Rol son Obligatorios."
      });
      return;
    }

    if (typeof UsuarioActualizado.avatar === "object") {
      ActualizarAvatar(token, UsuarioActualizado.avatar, usuario._id).then(response => {

        if (response.message === 'La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)') {
          notification["info"]({
            message: response.message
          });
        } else {
          UsuarioActualizado.avatar = response.avatarName;
          ActualizarUsuario(token, UsuarioActualizado, usuario._id).then(result => {
            notification["success"]({
              message: result.message
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
          });
        }
      });
    } else {
      ActualizarUsuario(token, UsuarioActualizado, usuario._id).then(result => {
        if (result.message === "Usuario actualizado correctamente.") {
          setIsVisibleModal(false);
          setReloadUsers(true);
        }
        notification["info"]({
          message: result.message
        });
        setReloadUsers(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar
        avatar={avatar}
        setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
        rol={rol} />
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

      <div className="navbarContenido">
        <div className="BuscadorContenido" >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nombre Usuario"
            value={userData.nombre_usuario}
            onChange={e =>
              setUserData({ ...userData, nombre_usuario: e.target.value })
            }
          />
        </div>
        <div className="BuscadorContenido" >
          <Input
            prefix={<MailOutlined />}
            placeholder="Correo"
            value={userData.correo}
            onChange={e =>
              setUserData({ ...userData, correo: e.target.value })
            }
          />
        </div>
      </div>

      <div className="navbarContenido">
        <Select
          className="BuscadorContenido2"
          placeholder="Seleccione una rol"
          onChange={e =>
            setUserData({ ...userData, id_rol: e })}
          value={userData.id_rol}
        >
          {rol.map((item) => {
            return <Option key={item._id.toString()} value={`${item._id}`}> {item.nombre} </Option>
          })}
        </Select>
      </div>


      <div className="navbarContenido">
        <div className="BuscadorContenido" >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Contraseña"
            onChange={e =>
              setUserData({ ...userData, contrasena: e.target.value })
            }
          />
        </div>
        <div className="BuscadorContenido" >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Repetir contraseña"
            onChange={e =>
              setUserData({ ...userData, contrasenaR: e.target.value })
            }
          />
        </div>
      </div>

      <Form.Item>
        <div className="navbarContenido">
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Usuario
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

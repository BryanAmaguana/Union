import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/user";
import { LockOutlined, UserOutlined  } from '@ant-design/icons';

import "./LoginForm.scss";



export default function LoginForm() {
    const [inputs, setInputs] = useState({
      nombre_usuario: "",
      contrasena: ""
    });
  
    const changeForm = e => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });
    };
  
    const login = async e => {
        e.preventDefault();
        const result = await signInApi(inputs);

        if(result.message){
            e.preventDefault();
            notification["error"]({
              message: result.message
            });
        }else {
          const { accessToken, refreshToken } = result;
          if(accessToken != null){
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            window.location.href="/admin";
          }else{
            e.preventDefault();
            notification["error"]({
              message: "Error al iniciar sesión con el servidor"
            });
          }
        }
    };
  
    return (
      <Form className="login-form" onChange={changeForm} onSubmitCapture={login} >
        <Form.Item>
          <Input
            prefix={<UserOutlined/>}
            type="text"
            name="nombre_usuario"
            placeholder="Usuario"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined/>}
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form__button">
          Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    );
  }
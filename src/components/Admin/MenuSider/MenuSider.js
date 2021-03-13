import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, TrademarkCircleOutlined, MehOutlined, CarOutlined, CreditCardOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../api/auth";
import jwt_decode from "jwt-decode";
import { Avatar } from "antd";
import NoAvatar from "../../../assets/img/png/no-avatar.png";
import { ObtenerAvatar } from "../../../../src/api/user";

import './MenuSider.scss';

function MenuSider(props) {
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;
    const [avatar, setAvatar] = useState(null);

    var token = getAccessTokenApi();
    var decoded = jwt_decode(token);
    ObtenerAvatar(decoded.avatar).then(response => {
        setAvatar(response);
    });

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <div className="box" align='center' >
                <Avatar src={avatar ? avatar : NoAvatar} />
            </div>
            <div className="centrado">
            <strong> {decoded.Usuario} </strong>
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin" >
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Inicio</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/usuario">
                    <Link to={"/admin/usuario"}>
                        <UserOutlined />
                        <span className="nac-text">Usuarios</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/rol">
                    <Link to={"/admin/rol"}>
                    <TrademarkCircleOutlined />
                        <span className="nac-text">Roles</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/persona">
                    <Link to={"/admin/persona"}>
                    <MehOutlined />
                        <span className="nac-text">Personas</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/bus">
                    <Link to={"/admin/bus"}>
                    <CarOutlined />
                        <span className="nac-text">Buses</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/tarjeta">
                    <Link to={"/admin/tarjeta"}>
                    <CreditCardOutlined />
                        <span className="nac-text">Tarjeta</span>
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
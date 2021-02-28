import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, TrademarkCircleOutlined } from '@ant-design/icons';
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

            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import './MenuSider.scss';

function MenuSider(props){
    const {menuCollapsed, location} =props;
    const {Sider} = Layout;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
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

            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
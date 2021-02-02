import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import { MenuOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props){
    const {menuCollapsed} =props;
    const {Sider} = Layout;
    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" >
                    <Link to={"/admin"}>
                    <HomeOutlined />
                    <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to={"/admin/menu-web"}>
                    <MenuOutlined />
                    <span className="nac-text">Menu web</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to={"/admin/Usuarios"}>
                    <UserOutlined />
                    <span className="nac-text">Usuarios</span>
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>
    );
}
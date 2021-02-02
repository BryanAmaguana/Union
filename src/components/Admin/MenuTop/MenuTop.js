import React from 'react';
/* import UnionLogo from '../../../assets/img/png/UnionIcono.png';  */
import UnionLogo2 from '../../../assets/img/png/ICONO2.png';
import { Button } from 'antd';
import { PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {logout} from '../../../api/auth'


import './MenuTop.scss';

export default function MenuTop(props) {

    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser= () =>{
        logout();
        window.location.href="/admin/login";
    }

    return (
        <div className="menu-top">
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <div className="menu-top__left">
                <Button icon={menuCollapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : <MenuFoldOutlined style={{ fontSize: '20px' }} />} type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} />
                <img
                    className="menu-top__left-logo"
                    src={UnionLogo2}
                    alt="Union"
                    
                />

            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    Cerrar Sesion <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}


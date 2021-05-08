import React from "react"
import { Menu } from "antd";
import { NavbarWrapper } from "./NavbarStyles"

import "./MenuTop.scss";

function Navbar({ open, menuData }) {
    return (
        <NavbarWrapper open={open}>
            <Menu className="Fondo" >
                {menuData.map(item => {
                    const external = item.url.indexOf("https") > -1 ? true : false;
                    if (external) {
                        return (
                            <Menu.Item key={item._id} >
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.titulo}
                                </a>
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item key={item._id}>
                            <a href={`#${item.url}`}>{item.titulo}</a>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </NavbarWrapper>
    )
}

export default Navbar
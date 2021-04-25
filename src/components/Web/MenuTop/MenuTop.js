import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { ObtenerMenuApi } from "../../../api/menu";
import logoUnion from "../../../assets/img/png/ICONO2.png";

import "./MenuTop.scss";

export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    ObtenerMenuApi().then(response => {
      const arrayMenu = [];
      try {
        response.menu.forEach(item => {
          item.disponible && arrayMenu.push(item);
        });
        setMenuData(arrayMenu);
      } catch (error) {
        window.location.href = "/Error404";
      }

    });
  }, []);

  const HomeLink = () => {
    window.location.href = "/";
  }

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="logoInicio" >
        <img
          className="menu-top__left-logo"
          src={logoUnion}
          alt="Union"
          onClick={HomeLink}
        />

      </Menu.Item  >
      {menuData.map(item => {
        const external = item.url.indexOf("https") > -1 ? true : false;
        if (external) {
          return (
            <Menu.Item key={item._id}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.titulo}
              </a>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={item._id} className="menu-top-web__item">
            <div><a className="smoothscroll" href={`#${item.url}`}>{item.titulo}</a></div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
import React, { useState, useEffect } from "react";
import { ObtenerMenuApi } from "../../../api/menu";
import logoUnion from "../../../assets/img/png/ICONO2.png";
import { HeaderWrapper } from "./HeaderStyles"
import Navbar from "./Navbar"
import MenuButton from "./MenuButton"


import "./MenuTop.scss";

export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);
  const [reloadMenuTop , setReloadMenuTop] = useState(false);

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
    setReloadMenuTop(false);
  }, [reloadMenuTop]);

  const HomeLink = () => {
    window.location.href = "/";
  }

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }


  return (
    <HeaderWrapper>
        <img
          className="logoInicio"
          src={logoUnion}
          alt="Union"
          onClick={HomeLink}
        />
      <Navbar open={open} menuData={menuData} />
      <MenuButton open={open} handleClick={handleClick} />
    </HeaderWrapper>
  );
}
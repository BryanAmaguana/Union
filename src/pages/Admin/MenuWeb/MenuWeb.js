import React, { useState, useEffect } from "react";
 import { ObtenerMenuApi } from "../../../api/menu";
import ListMenuWeb from "../../../components/Admin/MenuWeb/ListMenuWeb";

export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

  useEffect(() => {
    ObtenerMenuApi ().then(response => {
      setMenu(response.menu);
    });
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  return (
    <div className="menu-web">
      <ListMenuWeb menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
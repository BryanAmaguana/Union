import React, { useState, useEffect } from "react";
import { notification } from "antd";
import Inicio from '../../components/Web/Inicio';
import MisionVision from '../../components/Web/MisionVision';
import Footer from '../../components/Web/Footer';
import Informacion from '../../components/Web/Informacion';
import Historia from '../../components/Web/Historia';
import { ObtenerMenuApi } from "../../api/menu";

export default function InicioPagina() {
    const [menu, setmenu] = useState(false);

    useEffect(() => {
        ObtenerMenuApi()
            .then(response => {
                setmenu(response.menu);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    }, []);

    return (
        <div className="App">
            <Inicio />
            {menu ? (
                // eslint-disable-next-line
                menu.map((menu) => {
                    if (menu.disponible & menu.url === "Historia") {
                        return (<Historia key={menu._id}/>);
                    };
                    if (menu.disponible && menu.url === "MisionVision") {
                        return (<MisionVision key={menu._id}/>)
                    };
                    if (menu.disponible && menu.url === "Informacion") {
                        return (<Informacion key={menu._id}/>)
                    }
                })):(
                <Inicio />)}
            <Footer />
        </div>
    );
}

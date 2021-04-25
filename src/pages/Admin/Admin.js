import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../api/auth";
import { PasajeMeses } from "../../api/CobroPasaje"
import moment from 'moment';
import Grafico from "../../components/Admin/Grafico";
import { notification } from "antd";


export default function Admin() {
    const [reloadCobro, setReloadCobro] = useState(false);
    const [buses, setBuses] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        let f = new Date();
        const inicio = moment(f).format('YYYY-MM');
        const fin = moment(f).format('YYYY-MM-DD');

        PasajeMeses(token, `${inicio}-01`, fin).then(response => {
            if (response.cobro) {
                setBuses(response.cobro);
            }
        }).catch(err => {
            notification["error"]({
                message: err
            });
        });
        setReloadCobro(false);
    }, [token, reloadCobro]);

    return (
        <div className="Admin" >
            <Grafico nombre={buses} setBuses={setBuses} setReloadCobro={setReloadCobro} />
        </div>
    );
}
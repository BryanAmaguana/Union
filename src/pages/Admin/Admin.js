import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../api/auth";
import { ObtenerContenidoApi } from "../../api/contenidoWeb";
import { PasajeMeses } from "../../api/CobroPasaje"
import { ObtenerRecargaTotal } from "../../api/recargas"
import moment from 'moment';
import Grafico from "../../components/Admin/Grafico";


export default function Admin() {
    const [reloadCobro, setReloadCobro] = useState(false);
    const [buses, setBuses] = useState([]);
    const [recargar, setRecargar] = useState([]);
    const [contenido, setContendio] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        let f = new Date();
        const inicio = moment(f).format('YYYY-MM');
        const fin = moment(f).format('YYYY-MM-DD');

        PasajeMeses(token, `${inicio}-01`, fin).then(response => {
            if (response.cobro) {
                setBuses(response.cobro);
            }
        });

        ObtenerRecargaTotal(token, `${inicio}-01`, fin).then(response => {
            if (response.recarga) {
                setRecargar(response.recarga);
            }
        });

        ObtenerContenidoApi().then(response => {
            if (response.contenido) {
                setContendio(response.contenido);
            }
        });
        setReloadCobro(false);
    }, [token, reloadCobro]);

    return (
        <div className="Admin" >
            <Grafico nombre={buses} contenido={contenido} recargar={recargar} />
        </div>
    );
}
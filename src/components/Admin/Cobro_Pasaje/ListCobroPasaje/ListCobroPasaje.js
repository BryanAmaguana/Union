import React, { useState, useEffect } from "react";
import { List, Input, Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ObtenerCobroPasajeTodo, ObtenerCobroPasaje } from "../../../../api/CobroPasaje";
import { getAccessTokenApi } from "../../../../api/auth";
import { ObtenerBusNumero } from "../../../../api/bus";
import moment from 'moment';

import "./ListCobroPasaje.scss";
export default function ListCobro(props) {
    const { cobro, setcobro, setReloadCobro } = props;
    const [BusquedaCobro, setBusquedaCobro] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(4);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 4;
    const [Numero, setNumero] = useState("");
    const [Inicio, setInicio] = useState("");
    const [Fin, setFin] = useState("");

    function FechaInicio(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        setInicio(date);
    }

    function FechaFin(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        setFin(date)
    }

    /* Buscar usuarios */
    const Buscar = () => {
        if (Numero === "" || Numero === " " || Inicio === "" || Inicio === " " || Fin === "" || Fin === " ") {
            notification["error"]({
                message: "Campos Vacios."
            });
        } else {
            ObtenerBusNumero(token, Numero, true)
                .then(result => {
                    if (result.message === "No se encontro ningun Bus.") {
                        notification["error"]({
                            message: result.message
                        });
                        setBusquedaCobro(false);
                    } else {
                        ObtenerCobroPasaje(token, Inicio, Fin, Numero)
                            .then(response => {
                                setBusquedaCobro(response.cobro);
                            })
                            .catch(err => {
                                notification["error"]({
                                    message: err
                                });
                            });
                    }
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    return (
        /* switch y boton agregar persona */
        <div className="list-cobro">
            <div className="navbar">
                <div className="switch" >
                    <span >Fecha Inicio </span>
                    <DatePicker className="BuscadorB"
                        prefix={<SearchOutlined />}
                        placeholder="Fecha Inicio"
                        onChange={FechaInicio} />
                </div>
                <div className="switch" >
                    <span >Fecha Fin </span>
                    <DatePicker className="BuscadorB"
                        prefix={<SearchOutlined />}
                        placeholder=" Fecha Fin "
                        onChange={FechaFin} />
                </div>
                <span >Unidad N˚ </span>
                <div className="Buscador" >
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder=" Numero de Bus "
                        onChange={
                            event => setNumero(event.target.value)
                        }
                    />
                </div>
                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={Buscar}>
                        Buscar
                    </Button>
                </div>
            </div>

            {/* listado de usuarios activos e inactivos */}
            <Cobros
                cobro={BusquedaCobro ? BusquedaCobro : cobro}
                setReloadCobro={setReloadCobro} />

            {/* Paginacion de los usuarios Activos  */}
            <div className="centradoL">
                <Paginacion
                    paginaActual={paginaActual}
                    setpaginaActual={setpaginaActual}
                    token={token}
                    setcobro={setcobro}
                    desde={desde}
                    setDesde={setDesde}
                    limite={limite}
                    setLimite={setLimite}
                    NumeroPorPagina={NumeroPorPagina}
                    setReloadCobro={setReloadCobro} />
            </div>
        </div>
    );
}


/* Mostrar 4 siguientes usuarios Activos */
function Paginacion(props) {
    const { paginaActual, setpaginaActual, token, setcobro, desde, setDesde, limite, setlimite, NumeroPorPagina, setReloadCobro } = props;
    useEffect(() => {
        ObtenerCobroPasajeTodo(token, desde, limite).then(response => {
            setcobro(response.cobro);
            try {
                if ((response.cobro).length < NumeroPorPagina) {
                    document.getElementById('siguiente').disabled = true;
                }
            } catch (error) {
                setReloadCobro(true);
            }
        });
        // eslint-disable-next-line 
    }, [desde, limite, token, setcobro, setDesde, setlimite, NumeroPorPagina]);

    const Siguiente = () => {
        try {
            var PA = paginaActual + 1
            setpaginaActual(PA)
            setDesde(desde + limite);
            document.getElementById('anterior').disabled = false;
        } catch (error) {
        }
    }

    const Atras = () => {
        if (paginaActual > 1) {
            try {
                var PA = paginaActual - 1
                setpaginaActual(PA)
                setDesde(desde - limite);
                document.getElementById('siguiente').disabled = false;
            } catch (error) {
            }
        }
        if (paginaActual === 1) {
            document.getElementById('anterior').disabled = true;
        }
    }

    return (
        <div className="navbar">

        <div className="BuscadorB" >
          <Button id='anterior' className="centradoB" type="primary" onClick={Atras}>
            Anterior
          </Button>
        </div>
    
    
        <div className="BuscadorB" >
          <Button className="centradoB" type="second">
            {paginaActual}
          </Button>
        </div>
    
        <div className="BuscadorB" >
          <Button id='siguiente' className="centradoB" type="primary" onClick={Siguiente}>
            Siguiente
          </Button>
        </div>
    
      </div>
    )
}

/* Metodo para llamar a los usuarios activos */
function Cobros(props) {
    const { cobro, setReloadCobro } = props;

    return (
        <List
            className="cobro-active"
            itemLayout="horizontal"
            dataSource={cobro}
            renderItem={
                cobro => <ListaPersonas
                    cobro={cobro}
                    setReloadCobro={setReloadCobro} />}
        />

    );
}

const Valor = valor => {
    var cadena = valor;
    var separador = ".";
    var arregloDeSubCadenas = cadena.toString().split(separador, 3);
    if (arregloDeSubCadenas[1] && arregloDeSubCadenas[1].length === 1) {
        cadena = arregloDeSubCadenas[0] + "." + arregloDeSubCadenas[1] + "0";
    }
    return cadena;
}

/* Metodo que muesta los datos dento de la lista */
function ListaPersonas(props) {
    const { cobro } = props;

    return (
        <List.Item>
            <List.Item.Meta
                title={`Cobro de la unidad: 
              ${cobro.numero_bus_cobro ? cobro.numero_bus_cobro : '...'}
           ` }
                description={
                    <div>
                        <b>Tarjeta :</b> {cobro.codigo_tarjeta ? cobro.codigo_tarjeta : '...'}
                        <br />
                        <b>Valor:</b> {cobro.valor_pagado ? Valor(cobro.valor_pagado) : '...'}
                        <br />
                        <b>Fecha :</b> {cobro.fecha_hora_cobro ? cobro.fecha_hora_cobro.substr(0, 10) : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}


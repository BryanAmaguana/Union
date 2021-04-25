import React, { useState, useEffect } from "react";
import { List, Input, Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ObtenerRecarga, ObtenerRecargaFiltrado } from "../../../../api/recargas";
import { getAccessTokenApi } from "../../../../api/auth";
import moment from 'moment';

import "./ListRecarga.scss";
export default function ListRecargas(props) {
    const { recarga, setrecarga, setReloadRecarga } = props;
    const [BusquedaRecarga, setBusquedaRecarga] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(5);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 5;
    const [Nombre_usuario, setNombre_Usuario] = useState("");
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
        if (Nombre_usuario === "" || Nombre_usuario === " " || Inicio === "" || Inicio === " " || Fin === "" || Fin === " ") {
            notification["error"]({
                message: "Campos Vacios."
            });
        } else {
            ObtenerRecargaFiltrado(token, Inicio, Fin, Nombre_usuario)
                .then(response => {
                    setBusquedaRecarga(response.recarga);
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
        <div className="list-recarga">

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
                <span >Nombre de Usuario </span>
                <div className="Buscador" >
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder=" Nombre de Usuario "
                        onChange={
                            event => setNombre_Usuario(event.target.value)
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
            <LRecargas
                recarga={BusquedaRecarga ? BusquedaRecarga : recarga}
                setReloadRecarga={setReloadRecarga} />

            {/* Paginacion de los usuarios Activos  */}
            <div className="centradoL">
                <Paginacion
                    paginaActual={paginaActual}
                    setpaginaActual={setpaginaActual}
                    token={token}
                    setrecarga={setrecarga}
                    desde={desde}
                    setDesde={setDesde}
                    limite={limite}
                    setLimite={setLimite}
                    NumeroPorPagina={NumeroPorPagina}
                    setReloadRecarga={setReloadRecarga} />
            </div>
        </div>
    );
}


/* Mostrar 4 siguientes usuarios Activos */
function Paginacion(props) {
    const { paginaActual, setpaginaActual, token, setrecarga, desde, setDesde, limite, setlimite, NumeroPorPagina, setReloadRecarga } = props;
    useEffect(() => {
        ObtenerRecarga(token, desde, limite).then(response => {
            setrecarga(response.recarga);
            try {
                if ((response.recarga).length < NumeroPorPagina) {
                    document.getElementById('siguiente').disabled = true;
                }
            } catch (error) {
                setReloadRecarga(true);
            }
        });
        // eslint-disable-next-line 
    }, [desde, limite, token, setrecarga, setDesde, setlimite, NumeroPorPagina]);

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
function LRecargas(props) {
    const { recarga } = props;

    return (
        <List
            className="recarga-active"
            itemLayout="horizontal"
            dataSource={recarga}
            renderItem={
                r => <ListaRecargas
                    recarga={r} />}
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
function ListaRecargas(props) {
    const { recarga } = props;

    return (
        <List.Item>
            <List.Item.Meta
                title={`Recarga del Usuario: 
              ${recarga.nombre_usuario ? recarga.nombre_usuario : 'Sin Usuario'}
           ` }
                description={
                    <div>
                        <b>Tarjeta :</b> {recarga.codigo_tarjeta ? recarga.codigo_tarjeta : '...'}
                        <br />
                        <b>Valor:</b> {recarga.valor_recarga ? Valor(recarga.valor_recarga) : '...'}
                        <br />
                        <b>Fecha :</b> {recarga.fecha_hora_Accion ? recarga.fecha_hora_Accion.substr(0, 10) : '...'}
                    </div>
                }
            />
        </List.Item>
    );
}

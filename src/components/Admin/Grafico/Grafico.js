import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { PasajeMeses } from "../../../api/CobroPasaje"
import moment from 'moment';
import { getAccessTokenApi } from "../../../api/auth";

import './Grafico.scss'

export default function Grafico(props) {
    const { nombre } = props;
    const [Inicio, setInicio] = useState("");
    const [Busqueda, setBusqueda] = useState(false);
    const [Fin, setFin] = useState("");
    const Nlabel = [];
    const Vlabel = [];
    const token = getAccessTokenApi();

    function FechaInicio(dateString) {
        const date = moment(dateString).format('YYYY-MM');
        setInicio(date);
    }

    function FechaFin(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        setFin(date);
    }

    try {
        for (let i = 0; i < nombre.length; i++) {
            Nlabel.push(nombre[i].Numero_bus);
            Vlabel.push(nombre[i].total.toFixed(2));
        }
    } catch (error) {
        console.log("Intente mas tarde")
    }

    const Buscar = () => {
        if (Inicio === "" || Inicio === " " || Fin === "" || Fin === " ") {
            notification["error"]({
                message: "Campos Vacios."
            });
        } else {
            PasajeMeses(token, `${Inicio}-01`, Fin)
                .then(result => {
                    setBusqueda(result.cobro);
                }).catch(err => {
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
                    <span >Fecha Inicio &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder="Fecha Inicio"
                        onChange={FechaInicio} />
                </div>
                <div className="switch" >
                    <span >Fecha Fin &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder=" Fecha Fin "
                        onChange={FechaFin} />
                </div>
                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={Buscar}>
                        Buscar
                    </Button>
                </div>
            </div>
            <CreacionData
                Nlabel={Nlabel}
                Vlabel={Vlabel}
                Busqueda={Busqueda} />

        </div>

    );
}

function CreacionData(props) {
    const { Nlabel, Vlabel, Busqueda } = props;
    const NlabelB = [];
    const VlabelB = [];
    var data = {};

    if (Busqueda) {
        for (let i = 0; i < Busqueda.length; i++) {
            NlabelB.push(Busqueda[i].Numero_bus);
        }
        for (let i = 0; i < Busqueda.length; i++) {
            VlabelB.push(Busqueda[i].total.toFixed(2));
        }
    }

    if (Busqueda) {
        data = {
            labels: NlabelB,
            datasets: [{
                label: 'Ingresos',
                backgroundColor: 'rgb(235, 15, 15)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(241, 168, 168)',
                hoverBorderColor: 'blue',
                data: VlabelB
            }]
        };
    } else {
        data = {
            labels: Nlabel,
            datasets: [{
                label: 'Ingresos',
                backgroundColor: 'rgb(235, 15, 15)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(241, 168, 168)',
                hoverBorderColor: 'blue',
                data: Vlabel
            }]
        };
    }


    return (
        <CreacionGrafico data={data} />
    );
}

function CreacionGrafico(props) {
    const { data } = props;

    const opciones = {
        maintainAspecRatio: false,
        responsive: true
    }

    return (
            <Bar className="Gafico" data={data} options={opciones} />
    );
}



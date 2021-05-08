import React, { useState, useEffect } from "react";
import { List, Input, Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ObtenerCobroPasajeTodo, ObtenerCobroPasaje } from "../../../../api/CobroPasaje";
import { getAccessTokenApi } from "../../../../api/auth";
import { ObtenerBusNumero } from "../../../../api/bus";
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable';

import "./ListCobroPasaje.scss";
export default function ListCobro(props) {
    const { cobro, setcobro, setReloadCobro, contenido } = props;
    const [BusquedaCobro, setBusquedaCobro] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(4);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 4;
    const [Numero, setNumero] = useState("");
    const [Inicio, setInicio] = useState("");
    const [InicioRp, setInicioRp] = useState("");
    const [FinRp, setFinRP] = useState("");
    const [Fin, setFin] = useState("");
    const [Nbus, setNbus] = useState("");
    const [btnGenerar, setbntGenerar] = useState(true);
    const [Dueño, setDueño] = useState("");
    const [Cedula, setCedula] = useState("");
    let newDate = new Date()
    let month = newDate.getMonth();
    // eslint-disable-next-line
    var mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");


    function FechaInicio(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setInicioRp(date2);
        setInicio(date);
    }

    function FechaFin(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setFinRP(date2)
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
                        try {

                            setCedula(result.bus.id_persona.cedula_persona);
                            setDueño(result.bus.id_persona.nombre_persona + " " + result.bus.id_persona.apellido_persona);
                            setNbus(Numero);
                        } catch (error) {
                            setCedula("XXXXXXXXXX");
                            setDueño("XXXXXXXXXX XXXXXXXXXX");
                        }
                        setbntGenerar(false);
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


    const GenerarReporte = () => {

        // Create a new jsPDF instance
        const doc = new jsPDF("p", "pt", "a4"); // default values

        // doc.text(text, x, y, flags, angle, align);

        /*  ____________________________________Titulo del reporte____________________________________ */
        doc.setFontSize(16);
        doc.text(
            contenido[0].nombre.toUpperCase(),
            105 * 2.83, //horizontal
            15 * 2.83, //vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");


        /*  _______________________________Telefono y Direccion del reporte__________________________________ */
        doc.setFontSize(10);
        doc.text(
            "Correo: " + contenido[0].correo.toLowerCase(),
            105 * 2.83,//horizontal
            19 * 2.83,//vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");
        doc.text(
            "Teléfono: " + contenido[0].telefono.toLowerCase() + "   Celular: " + contenido[0].Celular.toLowerCase(),
            105 * 2.83,//horizontal
            23 * 2.83,//vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");

        /* __________________________________Linea que divide la cabecera_____________________________ */
        doc.setFontSize(14);
        doc.text(
            "________________________________________________________________________",
            103 * 2.83, //posicion Horizontal
            26 * 2.83, //Posicion vertical
            null,
            null,
            "center"
        );

        /* __________________________________Codigo para Agreagar una imagen_____________________________ */

        // add image to the pdf
        // doc.addImage(imageData, format, x, y, width, height);
        /*         doc.addImage(
                    "https://source.unsplash.com/random/600x400",
                    "JPEG",
                    15 * 2.83,
                    40 * 2.83,
                    180 * 2.83,
                    120 * 2.83
                ); */

        /* __________________________________Titulo del Cuerpo_____________________________ */
        // Image subtitle
        doc.setFontSize(14);
        doc.text(
            "Reporte mensual por unidad de transporte",
            105 * 2.83, //horizontal
            34 * 2.83, //vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");

        /* __________________________________Fecha del reporte _____________________________ */

        if (InicioRp === "" || InicioRp === " " || FinRp === "" || FinRp === " ") {
            notification["info"]({
                message: "Reporte generado del mes de " + mes[month]
            });

            doc.setFontSize(13);
            doc.text(
                // eslint-disable-next-line
                "Del " + `01/${month < 10 ? `0${month}` : `${month}`}/${year}` + " Al " + `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`,
                105 * 2.83, //horizontal
                42 * 2.80, //vertical
                null,
                null,
                "center"
            );
            doc.setFont("Times-Roman", "normal");
        } else {
            notification["info"]({
                message: "Reporte generado del " + InicioRp + " Al " + FinRp
            });
            doc.setFontSize(13);
            doc.text(
                "Del  " + InicioRp + "  Al  " + FinRp,
                105 * 2.83, //horizontal
                42 * 2.80, //vertical
                null,
                null,
                "center"
            );
            doc.setFont("Times-Roman", "normal");

        }

        /* __________________________________Tabla del reporte _____________________________ */
        // Table
        if (BusquedaCobro) {

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            let TotalB = 0;

            if (BusquedaCobro) {
                for (let i = 0; i < BusquedaCobro.length; i++) {
                    TotalB += BusquedaCobro[i].valor_pagado;
                }
            }

            doc.setFontSize(13);
            doc.text(
                "Total de ingresos $ " + TotalB.toFixed(2),
                14 * 2.83, //horizontal
                48 * 2.83, //vertical
                null,
                null,
                "left"
            );
            doc.setFont("Times-Roman", "normal");


            const usersCol = [" ", " "];

            let Pasajeros = 0;
            let PasajerosA = 0;
            let PasajerosAT = 0;
            let PasajerosN = 0;
            let PasajerosNT = 0;

            if (BusquedaCobro) {
                for (let i = 0; i < BusquedaCobro.length; i++) {
                    if (BusquedaCobro[i].valor_pagado > 0.15) {
                        PasajerosA++;
                        PasajerosAT += BusquedaCobro[i].valor_pagado;
                    } else {
                        PasajerosN++;
                        PasajerosNT += BusquedaCobro[i].valor_pagado;
                    }
                    Pasajeros++;

                }
            }

            const usersRows = [
                ["Cédula del propietario ", Cedula],
                ["Nombre Apellido del propietario ", Dueño],
                ["Bus N. ", Nbus],
                ["Fecha Inicio ", InicioRp],
                ["Fecha Fin ", FinRp],
                ["Pasajes completos registrados ($ 0.30)", PasajerosA + "  Adultos"],
                ["Total pasaje completos", "$ " + PasajerosAT.toFixed(2)],
                ["Niños o Tercera edad registrados ($ 0.15) ", PasajerosN + "  Niños/Tercera edad"],
                ["Total medio pasaje", "$ " + PasajerosNT.toFixed(2)],
                ["Total Pasajeros ", Pasajeros + " Personas"],
                ["Ingresos Totales ", "$ " + TotalB.toFixed(2)]];

            // const startY = 10 * 2.83;
            const startY = 50 * 2.83;
            doc.autoTable(usersCol, usersRows, {
                // startY: 180 * 2.83,
                startY,
                theme: "striped",
                styles: {
                    fontSize: 11
                }
            });
        } else {
            doc.setFontSize(14);
            doc.text(
                "Sin Conección a la base de Datos",
                105 * 2.83, //horizontal
                55 * 2.83, //vertical
                null,
                null,
                "center"
            );
            doc.setFont("Times-Roman", "normal");
        }

        /* __________________________________Mensaje Final _____________________________ */

        /*        doc.text(
                   "Test avec Hooks",
                   22 * 2.83,
                   doc.autoTable.previous.finalY + 22 // we can use doc.autoTable.previous to get previous table data
               ); */
        doc.save(`Reporte Cobros Bus N ${Nbus} del mes de  ${mes[month]}.pdf`);
    }

    return (
        /* switch y boton agregar persona */
        <div className="list-cobro">
            <div className="navbar">
                <div className="switch" >
                    <span >Fecha Inicio </span>
                    &nbsp;&nbsp;&nbsp;
                    <DatePicker className="BuscadorB"
                        prefix={<SearchOutlined />}
                        placeholder="Fecha Inicio"
                        onChange={FechaInicio} />
                </div>
                <div className="switch" >
                    <span >Fecha Fin </span>
                    &nbsp;&nbsp;&nbsp;
                    <DatePicker className="BuscadorB"
                        prefix={<SearchOutlined />}
                        placeholder=" Fecha Fin "
                        onChange={FechaFin} />
                </div>

                <div className="Buscador1">
                    <span >Unidad N˚ </span>
                    <Input
                        className="Buscador"
                        prefix={<SearchOutlined />}
                        placeholder=" Numero de Bus "
                        onChange={
                            event => setNumero(event.target.value)
                        }
                    />
                </div>
                &nbsp;
                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={Buscar}>
                        Buscar
                    </Button>
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="BuscadorB" >
                    <Button id='reporte' disabled={btnGenerar} className="BuscadorB" type="primary" onClick={GenerarReporte}>
                        Generar Reporte
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


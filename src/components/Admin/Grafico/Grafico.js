import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { PasajeMeses } from "../../../api/CobroPasaje"
import { ObtenerRecargaTotal } from "../../../api/recargas"
import moment from 'moment';
import { getAccessTokenApi } from "../../../api/auth";
import jsPDF from 'jspdf'
import 'jspdf-autotable';

import './Grafico.scss'

export default function Grafico(props) {
    const { nombre, contenido, recargar } = props;
    const [Busqueda, setBusqueda] = useState(false);
    const [BusquedaR, setBusquedaR] = useState(false);
    /* Fecha de busqueda de los cobros */
    const [Inicio, setInicio] = useState("");
    const [Fin, setFin] = useState("");
    const [InicioRp, setInicioRp] = useState("");
    const [FinRP, setFinRP] = useState("");
    /* Fecha busqueda de las recargas */
    const [InicioRecarga, setIRecargar] = useState("");
    const [FinRecarga, setFRecarga] = useState("");
    const [InicioRRp, setInicioRRp] = useState("");
    const [FinRRP, setFinRRP] = useState("");
    /* ....................... */
    const Nlabel = [];
    const Vlabel = [];
    const NlabelR = [];
    const VlabelR = [];
    var TotalI = 0;
    var TotalIR = 0;
    let newDate = new Date()
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let date = newDate.getDate();
    // eslint-disable-next-line
    var mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    const token = getAccessTokenApi();

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
        setFin(date);
    }

    function FechaInicioR(dateString) {
        const date = moment(dateString).format('YYYY-MM');
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setInicioRRp(date2);
        setIRecargar(date);
    }

    function FechaFinR(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setFinRRP(date2)
        setFRecarga(date);

    }

    try {
        for (let i = 0; i < nombre.length; i++) {
            Nlabel.push(" N˚ " + nombre[i].Numero_bus);
            Vlabel.push(nombre[i].total.toFixed(2));
            TotalI += nombre[i].total;
        }

        for (let i = 0; i < recargar.length; i++) {
            NlabelR.push(recargar[i].usuario);
            VlabelR.push(recargar[i].total.toFixed(2));
            TotalIR += recargar[i].total;
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
            TotalI = 0;
            PasajeMeses(token, Inicio, Fin)
                .then(result => {
                    setBusqueda(result.cobro);
                }).catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    const BuscarRecargas = () => {
        if (InicioRecarga === "" || InicioRecarga === " " || FinRecarga === "" || FinRecarga === " ") {
            notification["error"]({
                message: "Campos Vacios."
            });
        } else {
            TotalIR = 0;
            ObtenerRecargaTotal(token, InicioRecarga, FinRecarga)
                .then(result => {

                    setBusquedaR(result.recarga);
                }).catch(err => {
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
            "Reporte mensual de Ingresos de Buses",
            105 * 2.83, //horizontal
            34 * 2.83, //vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");

        /* __________________________________Fecha del reporte _____________________________ */

        if (Inicio === "" || Inicio === " " || Fin === "" || Fin === " ") {
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
                message: "Reporte generado del " + InicioRp + " Al " + FinRP
            });
            doc.setFontSize(13);
            doc.text(
                "Del  " + InicioRp + "  Al  " + FinRP,
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
        if (Busqueda) {

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            let TotalB = 0;

            if (Busqueda) {
                for (let i = 0; i < Busqueda.length; i++) {
                    TotalB += Busqueda[i].total;
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


            const usersCol = ["Unidad N","Total pasajeros", "Total Ingresos "];
            const usersRows = Busqueda.map(u => {
                const row = [u.Numero_bus,u.cobros, "$ " + u.total.toFixed(2)];
                return row;
            });

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

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            doc.setFontSize(13);
            doc.text(
                "Total de ingresos $ " + TotalI.toFixed(2),
                14 * 2.83, //horizontal
                48 * 2.83, //vertical
                null,
                null,
                "left"
            );
            doc.setFont("Times-Roman", "normal");


            const usersCol = ["Unidad N","Total pasajeros", "Total Ingresos "];

            const usersRows = nombre.map(u => {
                const row = [u.Numero_bus,u.cobros, "$ " + u.total.toFixed(2)];
                return row;
            });

            // const startY = 10 * 2.83;
            const startY = 50 * 2.83;
            doc.autoTable(usersCol, usersRows, {
                // startY: 180 * 2.83,
                startY,
                theme: "grid",
                styles: {
                    fontSize: 11
                }
            });
        }

        /* __________________________________Mensaje Final _____________________________ */

        /*        doc.text(
                   "Test avec Hooks",
                   22 * 2.83,
                   doc.autoTable.previous.finalY + 22 // we can use doc.autoTable.previous to get previous table data
               ); */
        doc.save(`Reporte Cobros Mensual ${mes[month]}.pdf`);
    }

    const GenerarReporteR = () => {

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
            "Reporte mensual de Recargas",
            105 * 2.83, //horizontal
            34 * 2.83, //vertical
            null,
            null,
            "center"
        );
        doc.setFont("Times-Roman", "normal");

        /* __________________________________Fecha del reporte _____________________________ */

        if (InicioRecarga === "" || InicioRecarga === " " || FinRecarga === "" || FinRecarga === " ") {
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
                message: "Reporte generado del " + InicioRRp + " Al " + FinRRP
            });
            doc.setFontSize(13);
            doc.text(
                "Del  " + InicioRRp + "  Al  " + FinRRP,
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
        if (BusquedaR) {

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            let TotalB = 0;

            if (BusquedaR) {
                for (let i = 0; i < BusquedaR.length; i++) {
                    TotalB += BusquedaR[i].total;
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

            const usersCol = ["Usuarios", "Numero de Recargas", "Total Ingresos"];

            const usersRows = BusquedaR.map(u => {
                const row = [u.usuario, u.Recargas, "$ " + u.total.toFixed(2)];
                return row;
            });

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

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            doc.setFontSize(13);
            doc.text(
                "Total de ingresos $ " + TotalIR.toFixed(2),
                14 * 2.83, //horizontal
                48 * 2.83, //vertical
                null,
                null,
                "left"
            );
            doc.setFont("Times-Roman", "normal");


            const usersCol = ["Usuario","Numero de Recargas", "Total Ingresos"];

            const usersRows = recargar.map(u => {
                const row = [u.usuario,u.Recargas, "$ " + u.total.toFixed(2)];
                return row;
            });

            // const startY = 10 * 2.83;
            const startY = 50 * 2.83;
            doc.autoTable(usersCol, usersRows, {
                // startY: 180 * 2.83,
                startY,
                theme: "grid",
                styles: {
                    fontSize: 11
                }
            });
        }

        /* __________________________________Mensaje Final _____________________________ */

        /*        doc.text(
                   "Test avec Hooks",
                   22 * 2.83,
                   doc.autoTable.previous.finalY + 22 // we can use doc.autoTable.previous to get previous table data
               ); */
        doc.save(`Reporte Recargas Mensual ${mes[month]}.pdf`);
    }

    return (
        /* switch y boton agregar persona */
        <div className="list-cobro">
            <h2 className="centradoB">Cobro de pasajes</h2>
            <div className="navbar">
                <div className="switch" >
                    <span >Fecha Inicio &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder="Fecha Inicio"
                        onChange={FechaInicio} />
                </div>
                &nbsp;
                <div className="switch" >
                    <span >Fecha Fin &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder=" Fecha Fin "
                        onChange={FechaFin} />
                </div>
                &nbsp;
                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={Buscar}>
                        Buscar
                    </Button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="BuscadorB" type="primary" onClick={GenerarReporte}>
                    Generar Reporte
                </Button>

            </div>
            <CreacionData
                Nlabel={Nlabel}
                Vlabel={Vlabel}
                Busqueda={Busqueda}
                TotalI={TotalI}
                InicioR={InicioRp}
                FinR={FinRP} />

            {/* ............................................................................................... */}
            &nbsp;&nbsp;&nbsp;
            <h2 className="centradoB">Recarga de Tarjetas</h2>

            <div className="navbar">
                <div className="switch" >
                    <span >Fecha Inicio &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder="Fecha Inicio"
                        onChange={FechaInicioR} />
                </div>
                &nbsp;
                <div className="switch" >
                    <span >Fecha Fin &nbsp;&nbsp;&nbsp;</span>
                    <DatePicker
                        prefix={<SearchOutlined />}
                        placeholder=" Fecha Fin "
                        onChange={FechaFinR} />
                </div>
                &nbsp;
                <div className="BuscadorB" >
                    <Button className="BuscadorB" type="primary" onClick={BuscarRecargas}>
                        Buscar
                    </Button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="BuscadorB" type="primary" onClick={GenerarReporteR}>
                    Generar Reporte
                </Button>

            </div>
            <CreacionDataR
                Nlabel={NlabelR}
                Vlabel={VlabelR}
                Busqueda={BusquedaR}
                TotalI={TotalIR}
                InicioR={InicioRRp}
                FinR={FinRRP} />

        </div>

    );
}

function CreacionDataR(props) {
    const { Nlabel, Vlabel, Busqueda, TotalI, InicioR, FinR } = props;
    const NlabelB = [];
    const VlabelB = [];
    var data = {};
    let TotalB = 0;

    if (Busqueda) {
        for (let i = 0; i < Busqueda.length; i++) {
            NlabelB.push(Busqueda[i].usuario);
        }
        for (let i = 0; i < Busqueda.length; i++) {
            VlabelB.push(Busqueda[i].total.toFixed(2));
            TotalB += Busqueda[i].total;
        }
    }

    if (Busqueda) {
        data = {
            labels: NlabelB,
            datasets: [{
                label: 'Ingresos $ ',
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
                label: 'Ingresos $ ',
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
        <CreacionGrafico data={data} total={Busqueda ? TotalB : TotalI} Busqueda={Busqueda} InicioR={InicioR} FinR={FinR} />
    );
}

function CreacionData(props) {
    const { Nlabel, Vlabel, Busqueda, TotalI, InicioR, FinR } = props;
    const NlabelB = [];
    const VlabelB = [];
    var data = {};
    let TotalB = 0;

    if (Busqueda) {
        for (let i = 0; i < Busqueda.length; i++) {
            NlabelB.push(Busqueda[i].Numero_bus);
        }
        for (let i = 0; i < Busqueda.length; i++) {
            VlabelB.push(Busqueda[i].total.toFixed(2));
            TotalB += Busqueda[i].total;
        }
    }

    if (Busqueda) {
        data = {
            labels: NlabelB,
            datasets: [{
                label: 'Ingresos $ ',
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
                label: 'Ingresos $ ',
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
        <CreacionGrafico data={data} total={Busqueda ? TotalB : TotalI} Busqueda={Busqueda} InicioR={InicioR} FinR={FinR} />
    );
}

function CreacionGrafico(props) {
    const { data, total, Busqueda, InicioR, FinR } = props;

    const opciones = {
        maintainAspecRatio: false,
        responsive: true
    }
    let newDate = new Date()
    const date2 = moment(newDate).format('DD-MM-YYYY');
    let mes = newDate.getMonth();
    // eslint-disable-next-line
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return (
        <div>
            <h3>{Busqueda ? `${InicioR ? "Ingreso del " + InicioR : "Mes no selecionado"} al ${FinR} $: ${total.toFixed(2)}`
                : `Ingreso  del mes de ${meses[mes]} hasta ${date2} $: ${total.toFixed(2)}`} </h3>
            <Bar className="Gafico" data={data} options={opciones} />
        </div>

    );
}



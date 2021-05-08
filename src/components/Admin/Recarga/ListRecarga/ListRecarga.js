import React, { useState, useEffect } from "react";
import { List, Input, Button, DatePicker, notification } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { ObtenerRecarga, ObtenerRecargaFiltrado } from "../../../../api/recargas";
import { ObtenerUsuariosNombreA } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable';

import "./ListRecarga.scss";
export default function ListRecargas(props) {
    const { recarga, setrecarga, setReloadRecarga, contenido } = props;
    const [BusquedaRecarga, setBusquedaRecarga] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [desde, setDesde] = useState(0);
    const [limite, setLimite] = useState(5);
    const token = getAccessTokenApi();
    const NumeroPorPagina = 5;
    const [Nombre_usuario, setNombre_Usuario] = useState("");
    const [Inicio, setInicio] = useState("");
    const [Fin, setFin] = useState("");
    /* Reportes */
    const [InicioRp, setInicioRp] = useState("");
    const [FinRp, setFinRP] = useState("");
    const [Usuario, setUsuario] = useState("");
    const [btnGenerar, setbntGenerar] = useState(true);
    let newDate = new Date()
    let month = newDate.getMonth();
    // eslint-disable-next-line
    var mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

    function FechaInicio(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        setInicio(date);
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setInicioRp(date2);
    }

    function FechaFin(dateString) {
        const date = moment(dateString).format('YYYY-MM-DD');
        setFin(date)
        const date2 = moment(dateString).format('DD-MM-YYYY');
        setFinRP(date2)
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
                    ObtenerUsuariosNombreA(token, response.recarga[0].nombre_usuario).then(response => {
                        setUsuario(response.usuario);
                    }).catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
                    setbntGenerar(false);
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
            "Reporte mensual de recargas de tarjetas",
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
        if (BusquedaRecarga) {

            /* __________________________________Total de ingresos_____________________________ */
            // Image subtitle
            let TotalB = 0;

            if (BusquedaRecarga) {
                for (let i = 0; i < BusquedaRecarga.length; i++) {
                    TotalB += BusquedaRecarga[i].valor_recarga;
                }
            }

            doc.setFontSize(13);
            doc.text(
                "Total de ingresos en recargas $ " + TotalB.toFixed(2),
                14 * 2.83, //horizontal
                48 * 2.83, //vertical
                null,
                null,
                "left"
            );
            doc.setFont("Times-Roman", "normal");

            const usersCol = [" ", " "];

            const usersRows = [
                ["Usuario ", Usuario[0].nombre_usuario],
                ["Cédula del Usuario ", Usuario[0].id_persona.cedula_persona],
                ["Nombre Apellido del usuario ", Usuario[0].id_persona.nombre_persona + " "+ Usuario[0].id_persona.apellido_persona],
                ["Fecha Inicio ", InicioRp],
                ["Fecha Fin ", FinRp],
                ["Total de recargas ", BusquedaRecarga.length],
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
        doc.save(`Reporte ${Usuario[0].nombre_usuario} del mes de  ${mes[month]}.pdf`);
    }

    return (
        /* switch y boton agregar persona */
        <div className="list-recarga">

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
                
                <div className="BuscadorR1" >
                <span >Nombre de Usuario </span>
                    <Input
                     className="BuscadorR"
                        prefix={<SearchOutlined />}
                        placeholder=" Nombre de Usuario "
                        onChange={
                            event => setNombre_Usuario(event.target.value)
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

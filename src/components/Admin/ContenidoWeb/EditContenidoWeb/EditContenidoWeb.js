import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Form, Input, Button, Row, Col, notification } from "antd";
import { useDropzone } from "react-dropzone";
import NoFondo from "../../../../assets/img/png/Fondo.png";
import { TagOutlined, PicCenterOutlined } from '@ant-design/icons';
import { ObtenerFondo, ActualizarFondo, ActualizarContenidoApi } from "../../../../api/contenidoWeb"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditContenidoWeb.scss"

export default function EditContenidoForm(props) {
    const { contenido, setIsVisibleModal, setReloadContenidoWeb } = props;
    const [fondo, setFondo] = useState("");
    const [FondoData, setFondoData] = useState({});


    useEffect(() => {
        if (contenido.fondo) {
            ObtenerFondo(contenido.fondo).then(response => {
                setFondo(response);
            });
        } else {
            setFondo(null);
        }
    }, [contenido]);


    useEffect(() => {
        if (fondo) {
            setFondoData({ ...FondoData, fondo: fondo.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fondo]);

    useEffect(() => {
        setFondoData({
            titulo: contenido.titulo,
            contenido: contenido.contenido,
            fondo: contenido.fondo
        });
    }, [contenido]);

    const updateContenido = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let FondoActualizado = FondoData;

        if (!FondoActualizado.titulo || !FondoActualizado.contenido) {
            notification["error"]({
                message: "Campos Vacios."
            });
            return;
        }

        if (typeof FondoActualizado.fondo === "object") {
                ActualizarFondo(token, FondoActualizado.fondo, contenido._id).then(response => {

                    if (response.message === 'La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)') {
                        notification["info"]({
                            message: response.message
                        });
                    } else {
                        FondoActualizado.fondo = response.FondoName;
                        ActualizarContenidoApi(token, contenido._id, FondoActualizado).then(result => {
                            notification["success"]({
                                message: result
                            });
                            setIsVisibleModal(false);
                            setReloadContenidoWeb(true);
                        });
                    }
                });
        } else {
            ActualizarContenidoApi(token, contenido._id, FondoActualizado).then(result => {
                if (result === "Contenido Web Actualizado correctamente.") {
                    setIsVisibleModal(false);
                    setReloadContenidoWeb(true);
                }
                notification["info"]({
                    message: result
                });
                setReloadContenidoWeb(true);
            });
        }
    };

    return (
        <div className="edit-contenido-form">
            <UploadAvatar
                fondo={fondo}
                setFondo={setFondo} />
            <EditForm
                FondoData={FondoData}
                setFondoData={setFondoData}
                updateContenido={updateContenido} />
        </div>
    );
}

function UploadAvatar(props) {
    const { fondo, setFondo } = props;
    const [fondorUrl, setFondoUrl] = useState(null);

    useEffect(() => {
        if (fondo) {
            if (fondo.preview) {
                setFondoUrl(fondo.preview);
            } else {
                setFondoUrl(fondo);
            }
        } else {
            setFondoUrl(null);
        }
    }, [fondo]);


    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setFondo({ file, preview: URL.createObjectURL(file) });
        },
        [setFondo]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoFondo} />
            ) : (
                <Avatar size={150} src={fondorUrl ? fondorUrl : NoFondo} />
            )}
        </div>
    );
}


function EditForm(props) {
    const { FondoData, setFondoData, updateContenido } = props;

    return (
        <Form className="form-edit" onSubmitCapture={updateContenido}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={<TagOutlined />}
                            placeholder="Título"
                            value={FondoData.titulo}
                            onChange={e =>
                                setFondoData({ ...FondoData, titulo: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <textarea
                            prefix={<PicCenterOutlined />}
                            placeholder="Contenido"
                            value={FondoData.contenido}
                            rows="10" 
                            cols="64"
                            onChange={e =>
                                setFondoData({ ...FondoData, contenido: e.target.value })
                            } />
                        {/*                        <Input
                            prefix={<PicCenterOutlined />}
                            placeholder="Contenido"
                            value={FondoData.contenido}
                            onChange={e =>
                                setFondoData({ ...FondoData, contenido: e.target.value })
                            }
                        /> */}
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Contenido
                </Button>
            </Form.Item>
        </Form>
    );
}
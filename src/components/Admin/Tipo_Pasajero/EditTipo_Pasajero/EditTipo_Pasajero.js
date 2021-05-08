import React, { useState, useEffect } from "react";
import { Form, Input, Button,notification } from "antd";
import { CreditCardOutlined, DollarCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ActualizarTipo_Pasajero } from "../../../../api/tipo_pasajero"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditTipo_Pasajero.scss"

export default function EditTipoForm(props) {
  const { tipo, setIsVisibleModal, setReloadTipo } = props;
  const [tipoData, setTipoData] = useState({});

  useEffect(() => {
    setTipoData({
      nombre: tipo.nombre,
      valor: tipo.valor,
      descripcion: tipo.descripcion,
    });
  }, [tipo]);

  const updateTipo = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let TipoActualizada = tipoData;

    if (!TipoActualizada.nombre || !TipoActualizada.valor || !TipoActualizada.descripcion) {
      notification["error"]({
        message: "Nombre, Valor y Descripción son Obligatorios."
      });
    }else{
      ActualizarTipo_Pasajero(token, TipoActualizada, tipo._id).then(result => {
        if (result.message === "Tipo de pasajero actualizado correctamente.") {
          setIsVisibleModal(false);
          setReloadTipo(true);
        }
        notification["info"]({
          message: result.message
        });
        setReloadTipo(true);
      });
    }
  };

  return (
    <div className="edit-tarjeta-form">
      <EditForm
        tipoData={tipoData}
        setTipoData={setTipoData}
        updateTipo={updateTipo} />
    </div>
  );
}

function EditForm(props) {
  const { tipoData, setTipoData, updateTipo } = props;

  return (
    <Form className="form-edit" onSubmitCapture={updateTipo}>



<div className="navbarContenido">
        <div className="BuscadorContenido" >
        <Input
              prefix={<CreditCardOutlined />}
              placeholder="Nombre"
              value={tipoData.nombre}
              onChange={e =>
                setTipoData({ ...tipoData, nombre: e.target.value })
              }
            />
        </div>
        <div className="BuscadorContenido" >
        <Input
              prefix={<DollarCircleOutlined />}
              placeholder="Valor 00.00"
              type="number"
              min="0"
              step="0.01"
              value={tipoData.valor}
              onChange={e =>
                setTipoData({ ...tipoData, valor: e.target.value })
              }
            />
        </div>
      </div>


      <div className="navbarContenido">
        <div className="BuscadorContenido1" >
        <Input
              prefix={<InfoCircleOutlined />}
              placeholder="Descripción"
              value={tipoData.descripcion}
              onChange={e =>
                setTipoData({ ...tipoData, descripcion: e.target.value })
              }
            />
        </div>
      </div>

      <Form.Item>
        <div className="navbarContenido">
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Tipo de Pasajero
        </Button>
        </div>
      </Form.Item>

    </Form>
  );
}
import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { FieldNumberOutlined, CreditCardOutlined } from '@ant-design/icons';
import { ActualizarBus } from "../../../../api/bus"
import { getAccessTokenApi } from "../../../../api/auth"


import "./EditBus.scss"

export default function EditBusForm(props) {
  const { bus, setIsVisibleModal, setReloadBus } = props;
  const [BusData, setBusData] = useState({});

  useEffect(() => {
    setBusData({
      numero_bus: bus.numero_bus,
      id_persona: bus.id_persona,
      placa_bus: bus.placa_bus
    });
  }, [bus]);

  const updateBus = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let BusActualizado = BusData;

    if (!BusActualizado.numero_bus || !BusActualizado.id_persona || !BusActualizado.placa_bus) {
      notification["error"]({
        message: "Número, Dueño y Placas son Obligatorios."
      });
      return;
    }

    ActualizarBus(token, BusActualizado, bus._id).then(result => {
      if (result.message === "Bus actualizado correctamente.") {
        setIsVisibleModal(false);
        setReloadBus(true);
      }
      notification["info"]({
        message: result.message
      });
      setReloadBus(true);
    });

  };

  return (
    <div className="edit-bus-form">
      <EditForm
        busData={BusData}
        setbusData={setBusData}
        updateBus={updateBus} />
    </div>
  );
}

function EditForm(props) {
  const { busData, setbusData, updateBus } = props;

  return (
    <Form className="form-edit" onSubmitCapture={updateBus}>

      <div className="navbarContenido">
        <div className="BuscadorContenido" >
          <Input
            prefix={<FieldNumberOutlined />}
            placeholder="Numero de Bus"
            type="number"
            min="0"
            value={busData.numero_bus}
            onChange={e =>
              setbusData({ ...busData, numero_bus: e.target.value })
            }
          />
        </div>

        <div className="BuscadorContenido" >
          <Input
            prefix={<CreditCardOutlined />}
            placeholder="Placa del Bus"
            value={busData.placa_bus}
            maxLength="7"
            onChange={e =>
              setbusData({ ...busData, placa_bus: e.target.value.toUpperCase() })
            }
          />
        </div>
      </div>
      <Form.Item>
        <div className="navbarContenido">
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Bus
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

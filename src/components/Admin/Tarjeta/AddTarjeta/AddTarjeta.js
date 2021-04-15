import React, { useState } from "react";
import { Form, Input, Button, Row, Col, notification, Select } from "antd";
import { CrearTarjeta } from "../../../../api/tarjeta";
import { getAccessTokenApi } from "../../../../api/auth";
import { CreditCardOutlined, DollarCircleOutlined } from '@ant-design/icons';

import "./AddTarjeta.scss";

export default function AddTarjetaForm(props) {
  const { setIsVisibleModal, setReloadTarjeta, Tipo_Pasajero } = props;
  const [tarjetaData, setTarjetaData] = useState({});

  const addTarjeta = event => {
    event.preventDefault();
    if (
      !tarjetaData.codigo ||
      !tarjetaData.valor_tarjeta ||
      !tarjetaData.descripcion
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });

    } else {
      const accesToken = getAccessTokenApi();
      CrearTarjeta(accesToken, tarjetaData)
        .then(response => {
          if (response === "Tarjeta creada exitosamente.") {
            notification["success"]({
              message: response
            });
            setTarjetaData({});
            setIsVisibleModal(false);
            setReloadTarjeta(true);
          } else {
            notification["error"]({
              message: response
            });
          }
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  };

  return (
    <div className="add-tarjeta-form">
      <AddForm
        tarjetaData={tarjetaData}
        setTarjetaData={setTarjetaData}
        addTarjeta={addTarjeta}
        Tipo_Pasajero={Tipo_Pasajero}
      />
    </div>
  );
}


function AddForm(props) {
  const { tarjetaData, setTarjetaData, addTarjeta, Tipo_Pasajero } = props;
  const { Option } = Select;
  return (

    <Form className="form-edit" onSubmitCapture={addTarjeta}>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="Código"
              value={tarjetaData.codigo}
              onChange={e =>
                setTarjetaData({ ...tarjetaData, codigo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<DollarCircleOutlined />}
              placeholder="Valor 00.00"
              type="number"
              min="0"
              step="0.01"
              value={tarjetaData.valor_tarjeta}
              onChange={e =>
                setTarjetaData({ ...tarjetaData, valor_tarjeta: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Seleccione tipo de Tarjeta"
              onChange={e =>
                setTarjetaData({ ...tarjetaData, descripcion: e })
              }
              value={tarjetaData.descripcion}
            >
              {Tipo_Pasajero.map((item) => {
                return <Option key={item._id.toString()} value={`${item._id}`}> {item.nombre} </Option>
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar Tarjeta
        </Button>
      </Form.Item>
    </Form>
  );
}
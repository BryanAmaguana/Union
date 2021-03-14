import React, { useState } from "react";
import { Form, Input, Button, Row, Col, notification} from "antd";
import { CrearRuta} from "../../../../api/ruta";
import { getAccessTokenApi } from "../../../../api/auth";
import { FieldNumberOutlined, ProfileOutlined, InfoCircleOutlined } from '@ant-design/icons';

import "./AddRuta.scss";

export default function AddRutaForm(props) {
  const { setIsVisibleModal, setReloadRuta } = props;
  const [RutaData, setRutaData] = useState({});

  const addRuta = event => {
    event.preventDefault();
    if (
      !RutaData.numero_ruta ||
      !RutaData.nombre_ruta ||
      !RutaData.descripcion
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });

    } else {
      const accesToken = getAccessTokenApi();
      CrearRuta(accesToken, RutaData)
        .then(response => {
          if(response === "Ruta creada exitosamente."){
            notification["success"]({
              message: response
            });
            setRutaData({});
            setIsVisibleModal(false);
            setReloadRuta(true);
          }else{
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
    <div className="add-ruta-form">
      <AddForm
        RutaData={RutaData}
        setRutaData={setRutaData}
        addRuta={addRuta}
      />
    </div>
  );
}


function AddForm(props) {
  const { RutaData, setRutaData, addRuta} = props;    
  return (

    <Form className="form-edit" onSubmitCapture={addRuta}>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<FieldNumberOutlined />}
              placeholder="Número Ruta"
              type="number"
              min="0"
              value={RutaData.numero_ruta}
              onChange={e =>
                setRutaData({ ...RutaData, numero_ruta: e.target.value})
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<ProfileOutlined />}
              placeholder="Nombre Ruta"
              value={RutaData.nombre_ruta}
              onChange={e =>
                setRutaData({ ...RutaData, nombre_ruta: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Input
              prefix={<InfoCircleOutlined/>}
              placeholder="Descripción"
              value={RutaData.descripcion}
              onChange={e =>
                setRutaData({ ...RutaData, descripcion: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar Ruta
        </Button>
      </Form.Item>
    </Form>
  );
}
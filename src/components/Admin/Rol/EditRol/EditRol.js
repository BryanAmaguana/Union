import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { InfoCircleOutlined, IdcardOutlined} from '@ant-design/icons';
import { ActualizarRol } from "../../../../api/rol"
import { getAccessTokenApi } from "../../../../api/auth"

export default function EditUserForm(props) {
    const { rol, setIsVisibleModal, setReloadRol } = props;
    const [rolData, setrolData] = useState({});

    useEffect(() => {
        setrolData({
            nombre: rol.nombre,
            descripcion: rol.descripcion,
        });
    }, [rol]);


    const updateRol = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let RolActualizado = rolData;

        if (!RolActualizado.nombre || !RolActualizado.descripcion) {
            notification["error"]({
                message: "Nombre y Descripcion son Obligatorios."
            });
            return;
        }
        ActualizarRol(token, RolActualizado, rol._id).then(result => {
            if (result.message === "Rol actualizado correctamente.") {
                setIsVisibleModal(false);
                setReloadRol(true);
            }
            notification["info"]({
                message: result.message
            });
            setReloadRol(true);
        });
    };

    return (
        <div className="edit-rol-form">
          <EditForm 
          rolData={rolData} 
          setrolData={setrolData} 
          updateRol={updateRol} 
          rol={rol} />
        </div>
      );
}

function EditForm(props) {
    const { rolData, setrolData, updateRol } = props;
  
    return (
      <Form className="form-edit" onSubmitCapture={updateRol}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<IdcardOutlined />}
                placeholder="Nombre Rol"
                value={rolData.nombre}
                onChange={e =>
                 setrolData({ ...rolData, nombre: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>


        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<InfoCircleOutlined />}
                placeholder="Descripción"
                value={rolData.descripcion}
                onChange={e =>
                  setrolData({ ...rolData, descripcion: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>

  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Rol
          </Button>
        </Form.Item>
      </Form>
    );
  }
  
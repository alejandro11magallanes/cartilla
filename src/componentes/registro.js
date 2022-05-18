import React, { Component, useState } from 'react'
import 'antd/dist/antd.css';
import {Col, Row, Select} from 'antd';
import './componentes.css';
import image from "./logopiki.png";
import FormularioPropietario from "./FormPropietario";
import FormularioProveedor from "./FormProvedor";
import RegistroProvedor from './registroProv'
import Tabla from './tabla';

const Reg = () => {

  const [valor, setValue] = useState(true);
  const { Option } = Select;

  function handleChange(value) {
    setValue(value)
  }

  return (
    <div>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col xs={1} sm={2} md={4} lg={7}>
        <img className='perroRegistro' src={image}/>
        </Col>
        <Col xs={22} sm={20} md={16} lg={10}>
        <h1 className='containerSecundario'>Registro de Nuevo Usuario</h1>
        <br/>
        <Select placeholder="Tipo de Usuario" style={{ width: '100%' }} onChange={handleChange}>
          <Option className='valor' value={true}>Proveedor de servicios o Comercio</Option>
          <Option className='valor' value={false}>Propietario de Mascota</Option>
        </Select>

          {valor ? <RegistroProvedor /> : <Tabla />}

        </Col>
        <Col xs={1} sm={2} md={4} lg={7}></Col>
      </Row>
    </div>
  )
}

export default () => <Reg />;

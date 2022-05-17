import React, { Component } from 'react'
import 'antd/dist/antd.css';
import {Col, Row, Select} from 'antd';
import './componentes.css';
import image from "./logopiki.png";
import FormularioPropietario from "./FormPropietario";
import FormularioProveedor from "./FormProvedor";



export default class registro extends Component {
  constructor(props) {
    super(props);
  }


  render()
   {

    const { Option } = Select;

    function handleChange(value) {
      console.log(value);
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
            <Option value="1">Proveedor de servicios o Comercio</Option>
            <Option value="2">Propietario de Mascota</Option>
          </Select>
          </Col>
          <Col xs={1} sm={2} md={4} lg={7}></Col>
        </Row>
      </div>
    )
  }
}

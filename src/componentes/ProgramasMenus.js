import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.min.css';
import {Col, Row, Select} from 'antd';
import './componentes.css';
import image from "./logopiki.png";
import FormularioPropietario from "./FormPropietario";
import FormularioProveedor from "./FormProvedor";
import { render } from '@testing-library/react';
import axios from 'axios';
const urlApi = 'http://127.0.0.1:4444/menu'
const urlApic = 'http://127.0.0.1:4444/menu/count'

const Pm = () => {

  const [data, setData] = useState([]);
  const [valor, setValue] = useState(null);
  const { Option } = Select;

    const cantidad = async () => {
        axios.get(urlApic).then((response) =>
        traerTabla(response.data)
        ).catch(error =>{
            console.log(error);
        })
    }

    const traerTabla = async (valor) => {
        axios.post(urlApi,{MEN_NUMCTRL:"", MEN_CLAVE:"", MEN_NOMBRE:"", MEN_DESC:"", ORDER:"", BY:"", LIMIT1:0, LIMIT2:valor},{

          "headers": {
          
          "content-type": "application/json",
          
          },
          
          }).then((response) =>
        setData(response.data)
        ).catch(error =>{
            console.log(error);
        })
    }

    useEffect(()=>{
      cantidad()
    },[])

  function handleChange(value) {
    setValue(value)
  }

  let dataLIST = data.length > 0
  && data.map((item, i) => {
  return (
      <option key={i} value={item.MEN_NUMCTRL}>{item.MEN_CLAVE}</option>
  )
}, this);


  return (
    <div>
    <br/>
    <br/>
    <br/>
    <Row>
      <Col xs={22} sm={20} md={16} lg={10}>
      <Select placeholder="Tipo de Usuario" defaultValue=". . ." style={{ width: '100%' }} onChange={handleChange}>
        {dataLIST}
      </Select>
      </Col>
      <Col xs={1} sm={2} md={4} lg={7}></Col>
    </Row>
  </div>
  )
}

export default Pm ;
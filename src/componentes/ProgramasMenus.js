import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.min.css';
import {Button, Col, Form, Input, Row, Select, Table, Modal, Dropdown, Menu, Space} from 'antd';
import {EditOutlined, DeleteOutlined, DownOutlined, SmileOutlined} from '@ant-design/icons'
import './componentes.css';
import image from "./logopiki.png";
import FormularioPropietario from "./FormPropietario";
import FormularioProveedor from "./FormProvedor";
import { render } from '@testing-library/react';
import axios from 'axios';
import az from '../imagenes/az.jpg'
import SaveModalPXM from './saveModalPXM';
const urlApi = 'http://127.0.0.1:4444/menu'
const urlApic = 'http://127.0.0.1:4444/menu/count'

const urlApi2 = 'http://127.0.0.1:4444/proxmen'
const urlApic2 = 'http://127.0.0.1:4444/proxmen/count'

const Pm = () => {

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [editMenu, setEditMenu] = useState(null);
  const [valor, setValue] = useState(null);
  const { Option } = Select;
  const [clv, setclv] = useState("");
  const [nmb, setnmb] = useState("");
  const [des, setdes] = useState("");
  const [ord, setord] = useState("")
  const [men, setmen] = useState("")
  const [lim2, setlim2] = useState(1000)
  const [estado, setestado] = useState(false)

    const cantidad = async () => {
        axios.get(urlApic).then((response) =>
        traerTabla(response.data)
        ).catch(error =>{
            console.log(error);
        })
    }

    const onDelete=(id)=>{
      Modal.confirm({
          title: 'Estás seguro que deseas eliminar este registro?',
          okText: 'Confirmar',
          okType: 'danger',
          cancelText: 'Cancelar',
          onOk:()=>{
              axios.delete(urlApi2+ "/" + id.PXM_NUMCTRL).then((response)=>{
                  traerTabla2()
              })
          }
      })
  }

  const onUpdate=(id)=>{
      setEdit(true)
      setEditMenu({...id})
  }

    const conteo = async () =>{
      axios.get(urlApic).then((response) =>
      setlim2(response.data)
      ).catch(error =>{
          console.log(error);
      })
  }

  const BY ="", LIM1=0 , NUMERO=""

  const body = JSON.stringify({
    "MEN_NUMCTRL":NUMERO,
    "MEN_CLAVE":clv,
    "MEN_NOMBRE":nmb,
    "MEN_DESC":des,
    "ORDER":ord,
    "BY":BY,
    "LIMIT1":LIM1,
    "LIMIT2":lim2
  })

  const traerTabla = async () => {
      axios.post(urlApi, body,{

        "headers": {
        
        "content-type": "application/json",
        
        },
        
        }).then((response) =>
      setData(response.data)
      ).catch(error =>{
          console.log(error);
      })
  }

  const traerTabla2 = async () => {
    axios.post(urlApi2, {MEN_NUMCTROL: "", PRG_NOMBRE: "", PRG_CLAVE:nmb, PRG_DESC: des, MEN_NOMBRE: "", ORDER: ord, BY: BY, LIMIT1:LIM1, LIMIT2: lim2},{

      "headers": {
      
      "content-type": "application/json",
      
      },
      
      }).then((response) =>
    setData2(response.data)
    ).catch(error =>{
        console.log(error);
    })
}

    useEffect(()=>{
      cantidad()
    },[])

  const handleChange =(value)=> {
    console.log(value)
    traerTabla2()
    setmen(value)
    if(value!=""){
      setestado(true)
    }

  }

  let dataLIST = data.length > 0
  && data.map((item, i=0) => {
  return (
      <Select.Option key={i} value={item.MEN_NUMCTRL}>{item.MEN_CLAVE}</Select.Option>
  )
}, this);

  const columns = [
    {
        title: 'Programa',
        dataIndex: 'PRG_CLAVE',
        key: 'PRG_CLAVE',
        width: '40%',
      },
      {
        title: 'Etiqueta',
        dataIndex: 'PRG_DESC',
        key:"PRG_DESC",
        width: '40%',
    },
  {
      title: 'Acción',
      key: 'ASU',
      width: '20%',
      render:(record)=>{
          return <>
          <div>
                <DeleteOutlined onClick={()=>{
                    onDelete(record)
                }} style={{color:"red", 
            marginLeft:50}}/>
          </div>
          </>
      }
  }
  ];


  return (
    <div>
    <br/>
    <br/>
    <br/>
    <Row>
      <Col  xs={22} sm={20} md={16} lg={10}>
      <Select defaultValue={men} style={{ width: '100%' }} onChange={e =>handleChange(e)}>
        {dataLIST}
      </Select>
      </Col>
      <Col style={{marginLeft:10}} xs={1} sm={2} md={4} lg={7}>
      {estado? <SaveModalPXM name={men}/>: undefined}
      </Col>
    </Row><br></br>

    <div>
              <Form>
                  <Row>
                  <Col lg={4}>
                  <Form.Item>
                  <Input value={nmb} placeholder='Programa' onClick={()=>{
                      setnmb("")
                      setdes("")
                  }} onChange={(x)=>{
                      setnmb(x.target.value)
                  }}/><button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                      setord("PRG_NOMBRE")
                      traerTabla2()
                  }}><img src={az}/></button>
                  </Form.Item>
                  </Col>
                  <Col lg={4} offset={1}>
                  <Form.Item>
                  <Input value={des} placeholder="Etiqueta" onClick={()=>{
                      setclv("")
                      setnmb("")
                  }} onChange={(b)=>{
                      setdes(b.target.value)
                  }}/><button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                      setord("PRG_DESC")
                      traerTabla2()
                  }}><img src={az}/></button>
                  </Form.Item>
                  </Col>

                  <Col lg={2} offset={1}>
                              <Form.Item>
                              <Input defaultValue={10} placeholder='Mostrar' onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                  }
                              }} onChange={(x)=>{
                                  if(x.target.value == ""){
                                      conteo()
                                  }else{
                                      setlim2(x.target.value)
                                  }
                              }}/>
                              </Form.Item>
                      </Col>

                  <Col lg={2} offset={1}>
                  <Form.Item>
              <Button type="primary" htmlType="submit" onClick={()=>{
                  traerTabla2()
              }}>
                Buscar
              </Button>
            </Form.Item>
                  </Col>
                  <Col lg={2} offset={1}>
                  <Form.Item>
              <Button type="danger" htmlType="submit" onClick={()=>{
                  setdes("")
                  setclv("")
                  setnmb("")
                  setord("")
              }}>
                Limpiar Filtros
              </Button>
            </Form.Item>
                  </Col>
                  </Row>
              </Form>
        </div>

        <Table columns={columns} dataSource={data2}/>

  </div>
  )
}

export default Pm ;
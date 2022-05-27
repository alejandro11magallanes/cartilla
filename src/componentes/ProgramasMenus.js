import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.min.css';
import {Button, Col, Form, Input, Row, Select, Table, Modal, Dropdown, Menu, Space, message} from 'antd';
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
  const [data3, setData3] = useState([]);
  const [editMenu, setEditMenu] = useState(null);
  const [valor, setValue] = useState(null);
  const { Option } = Select;
  const [clv, setclv] = useState("");
  const [nmb, setnmb] = useState("");
  const [des, setdes] = useState("");
  const [ord, setord] = useState("PXM_ORDEN")
  const [men, setmen] = useState("")
  const [etiqueta, setEtiqueta] = useState("")
  const [ordenado, setOrdenado] = useState("")
  const [lim2, setlim2] = useState(1000)
  const [estado, setestado] = useState(false)
  const key = 'updatable';

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
                  traerTabla3()
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
    "ORDER":"",
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

  const traerTabla2 = async (clave) => {
    if(clave == null){
      clave = men
    }
    axios.post(urlApi2, {MEN_NUMCTRL: clave, PRG_NOMBRE: etiqueta, PRG_CLAVE:nmb, PRG_DESC: des, MEN_NOMBRE: "", ORDER: ord, BY: BY, LIMIT1:LIM1, LIMIT2: lim2, PXM_ORDEN:ordenado},{

      "headers": {
      
      "content-type": "application/json",
      
      },
      
      }).then((response) =>
    setData2(response.data)
    ).catch(error =>{
        console.log(error);
    })
}

const traerTabla3 = async (clave) => {
    if(clave == null){
        clave = men
      }
    axios.post(urlApi2, {MEN_NUMCTRL: clave, PRG_NOMBRE: "", PRG_CLAVE:"", PRG_DESC: "", MEN_NOMBRE: "", ORDER: "PXM_ORDEN", BY: "", LIMIT1:0, LIMIT2: 9999},{

      "headers": {
      
      "content-type": "application/json",
      
      },
      
      }).then((response) =>
    setData3(response.data)
    ).catch(error =>{
        console.log(error);
    })
}

    useEffect(()=>{
      cantidad()
      console.log(data3.length)
    },[data3])

  const handleChange =(value)=> {
    console.log(value)
    setmen(value)
    traerTabla2(value)
    if(value!=""){
      setestado(true)
    }
    traerTabla3(value)
  }

  const onUpdateRegister=()=>{
    Modal.confirm({
        title: 'Estás seguro que deseas actualizar este registro?',
        okText: 'Confirmar',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk:()=>{
            if(editMenu?.PXM_ORDEN > data3.length){
                message.error({ content: 'Elegiste un orden mayor al limite!', key, duration: 4, style: {
                    marginTop: '18vh',
                }, });
            }
            else if(editMenu?.PXM_ORDEN <= 0){
                message.error({ content: 'Elegiste un orden menor al limite!', key, duration: 4, style: {
                    marginTop: '18vh',
                }, });
            }
            else{
                const data={PXM_ORDEN: editMenu?.PXM_ORDEN}
                axios.put(urlApi2+ "/" + editMenu?.PXM_NUMCTRL,data).then((response)=>{
                    traerTabla2()
                    traerTabla3()
                })
            }
        }
    })
}

  let dataLIST = data.length > 0
  && data.map((item, i=0) => {
  return (
      <Select.Option key={i} value={item.MEN_NUMCTRL}>{item.MEN_NOMBRE}</Select.Option>
  )
}, this);

  const columns = [
    {
        title: 'Programa',
        dataIndex: 'PRG_CLAVE',
        key: 'PRG_CLAVE',
        width: '20%',
      },
      {
        title: 'Orden',
        dataIndex: 'PXM_ORDEN',
        key:"PXM_ORDEN",
        width: '20%',
    },
    {
        title: 'Etiqueta',
        dataIndex: 'PRG_NOMBRE',
        key:"PRG_NOMBRE",
        width: '20%',
    },
  {
      title: 'Acción',
      key: 'ASU',
      width: '20%',
      render:(record)=>{
          return <>
          <div>              <EditOutlined onClick={()=>{
                        onUpdate(record)
                    }} style={{color:"orange"}} />
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
      {estado? <SaveModalPXM tabladato={data2} orden={data3.length+1} name={men}/>: undefined}
      </Col>
    </Row><br></br>

    <div>
              <Form>
                  <Row>
                  <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
                  <Form.Item>
                  <Input value={nmb} placeholder='Programa' onClick={()=>{
                      setnmb("")
                      setEtiqueta("")
                      setOrdenado("")
                      setord("PXM_ORDEN")
                  }} onChange={(x)=>{
                      setnmb(x.target.value)
                      traerTabla2()
                      traerTabla3()
                  }}/>
                  </Form.Item>
                  </Col>
                  <Col>
                  <button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                      setord("PRG_CLAVE")
                      traerTabla2()
                      traerTabla3()
                  }}><img src={az}/></button>
                  </Col>
                  <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
                  <Form.Item>
                  <Input value={ordenado} placeholder="Orden" onClick={()=>{
                      setclv("")
                      setnmb("")
                      setord("PXM_ORDEN")
                      setEtiqueta("")
                  }} onChange={(b)=>{
                      setOrdenado(b.target.value)
                      traerTabla2()
                      traerTabla3()
                  }}/>
                  </Form.Item>
                  </Col>
                  <Col>
                  <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                      setord("PXM_ORDEN")
                      traerTabla2()
                      traerTabla3()
                  }}><img src={az}/></button>
                  </Col>

                  <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
                  <Form.Item>
                  <Input value={etiqueta} placeholder="Etiqueta" onClick={()=>{
                      setclv("")
                      setnmb("")
                      setOrdenado("")
                  }} onChange={(b)=>{
                      setEtiqueta(b.target.value)
                      traerTabla2()
                      traerTabla3()
                  }}/>
                  </Form.Item>
                  </Col>
                  <Col>
                  <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                      setord("PRG_NOMBRE")
                      traerTabla2()
                      traerTabla3()
                  }}><img src={az}/></button>
                  </Col>

                  <Col lg={2} md={2} sm={2} offset={1} style={{padding:5}}>
                  <Form.Item>
              <Button type="danger" htmlType="submit" onClick={()=>{
                  setOrdenado("")
                  setclv("")
                  setnmb("")
                  setEtiqueta("")
                  setord("PXM_ORDEN")
                  traerTabla2()
                  traerTabla3()
              }}>
                Limpiar Filtros
              </Button>
            </Form.Item>
                  </Col>
                  </Row>
              </Form>
        </div>

        <Table showHeader={false} pagination={{position:["bottomCenter"]}} columns={columns} dataSource={data2}/>

        <Modal title="Editar orden" okText="Actualizar" cancelText="Regresar" visible={edit} onCancel={()=>{
              setEdit(false)
          }} onOk={()=>{
              onUpdateRegister()
              setEdit(false)
          }}>
              <label>Orden</label>
              <Input value={editMenu?.PXM_ORDEN} required={true} onChange={(x)=>{
                  setEditMenu((pre)=>{
                      return {...pre, PXM_ORDEN: x.target.value}
                  })
              }}/><br></br><br></br>

          </Modal>

  </div>
  )
}

export default Pm ;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import 'antd/dist/antd.min.css';
import {Button, Col, Form, Input, Modal, Row, Select, Table} from 'antd';
import Item from 'antd/lib/list/Item';
import './componentes.css'
import az from '../imagenes/az.jpg'
const urlApi = ' http://127.0.0.1:4444/menu';
const urlApic = ' http://127.0.0.1:4444/menu/count';

function TableMenu() {

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [editMenu, setEditMenu] = useState(null);
    const [clv, setclv] = useState("");
    const [nmb, setnmb] = useState("");
    const [des, setdes] = useState("");
    const [ord, setord] = useState("")
    const [lim2, setlim2] = useState(10)

    const { Option } = Select;

    const NUMERO ="", BY="", LIM1=0

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

    useEffect(()=>{
        traerTabla();
    },[])


    const onDelete=(id)=>{
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk:()=>{
                axios.delete(urlApi+ "/" + id.MEN_NUMCTRL).then((response)=>{
                    traerTabla()
                })
            }
        })
    }

    function handleChange(value) {
        setlim2(value)
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

    const onUpdateRegister=()=>{
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk:()=>{
                const data={MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE, MEN_DESC: editMenu?.MEN_DESC }
                console.log(data)
                axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                    traerTabla()
                })
            }
        })
    }
      
    const columns = [
        {
            title: 'Clave',
            dataIndex: 'MEN_CLAVE',
            key: 'MEN_CLAVE',
            width: '20%',
          },
      {
        title: 'Nombre',
        dataIndex: 'MEN_NOMBRE',
        key: 'MEN_NOMBRE',
        width: '20%',
        
      },
      {
          title: 'Descripción',
          dataIndex: 'MEN_DESC',
          key:"MEN_DESC",
          width: '40%',
      },
      {
          title: 'Acción',
          key: 'ASU',
          width: '20%',
          render:(record)=>{
              return <>
              <div>
              <EditOutlined onClick={()=>{
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

        <div>

        <Form>
            <Row>
            <Col lg={4}>
            <Form.Item>
            <Input value={clv} placeholder='Clave' onClick={()=>{
                setnmb("")
                setdes("")
            }} onChange={(x)=>{
                setclv(x.target.value)
            }}/><button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                setord("MEN_CLAVE")
                traerTabla()
            }}><img src={az}/></button>
            </Form.Item>
            </Col>
            <Col lg={4} offset={1}>
            <Form.Item>
            <Input value={nmb} placeholder="Nombre" onClick={()=>{
                setclv("")
                setdes("")
            }} onChange={(a)=>{
                setnmb(a.target.value)
            }}/><button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setord("MEN_NOMBRE")
                traerTabla()
            }}><img src={az}/></button>
            </Form.Item>
            </Col>
            <Col lg={4} offset={1}>
            <Form.Item>
            <Input value={des} placeholder="Descripción" onClick={()=>{
                setclv("")
                setnmb("")
            }} onChange={(b)=>{
                setdes(b.target.value)
            }}/><button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setord("MEN_DESC")
                traerTabla()
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
            traerTabla()
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

        <Table columns={columns} dataSource={data}/>
        <Modal title="Editar menú" okText="Actualizar" cancelText="Regresar" visible={edit} onCancel={()=>{
            setEdit(false)
        }} onOk={()=>{
            onUpdateRegister()
            setEdit(false)
        }}>
            <label>Clave</label>
            <Input value={editMenu?.MEN_CLAVE} required={true} onChange={(x)=>{
                setEditMenu((pre)=>{
                    return {...pre, MEN_CLAVE: x.target.value}
                })
            }}/><br></br><br></br>
            <label>Nombre</label>
            <Input value={editMenu?.MEN_NOMBRE} required={true} onChange={(x)=>{
                setEditMenu((pre)=>{
                    return {...pre, MEN_NOMBRE: x.target.value}
                })
            }}/><br></br><br></br>
            <label>Descripción</label>
            <Input value={editMenu?.MEN_DESC} required={true} onChange={(x)=>{
                setEditMenu((pre)=>{
                    return {...pre, MEN_DESC: x.target.value}
                })
            }}/><br></br><br></br>

        </Modal>
    </div>
  )
}

export default TableMenu
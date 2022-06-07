import { Button, Col, message, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import axios from "axios";
import { Input } from "antd";
import './componentes.css'
import az from '../imagenes/az.jpg'
import FormSubMenu from "./FormSaveSubMenu";

const SubMenu = () =>{
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [etiqueta, setEtiqueta] = useState("");
    const [estado, setEstado] = useState(0)
    const [BY, setBY] = useState("")
    const [ord, setord] = useState("SUM_ETIQUETA")
    const [padre, setPadre] = useState(0)
    
    const urlApi = ' http://127.0.0.1:4444/submenu';

    const body = JSON.stringify({
        "SUM_ETIQUETA":etiqueta,
        "ORDER":ord,
        "BY":BY,
      })

      const handler = (param) =>{
        setPadre(param)
    }

      const onDelete=(id)=>{
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk:()=>{
                axios.delete(urlApi+ "/" + id.SUM_NUMCTRL).then((response)=>{
                    traerTabla()
                })
            }
        })
    }

    const onUpdateRegister=()=>{
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk:()=>{
                const data={SUM_ETIQUETA: editMenu?.SUM_ETIQUETA}
                console.log(data)
                axios.put(urlApi+ "/" + editMenu?.SUM_NUMCTRL,data).then((response)=>{
                    traerTabla()
                })
            }
        })
    }

    const onUpdate=(id)=>{
        setEdit(true)
        setEditMenu({...id})
    }

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
        traerTabla()
        actualizado()
    },[etiqueta, ord, BY, padre])

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'SUM_ETIQUETA',
        key: 'SUM_ETIQUETA',
        width: '50%',
        
      },
      {
          title: 'Acción',
          key: 'ASU',
          width: '50%',
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

    const ORDBY = () =>{
        if(estado == 0){
            setEstado(1)
            setBY("ASC")
        }else if(estado == 1){
            setEstado(0)
            setBY("DESC")
        }
    } 

    const actualizado = () =>{
        if(padre == 1){
            setTimeout(() => {
                traerTabla()
                setPadre(0)
                }, 3000);
            }
      }

    return(
        <div>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                <FormSubMenu padre={handler}/>
                </Col>
            </Row><br></br>
            <Row>
            {/* <Col lg={7} md={6} sm={6} xs={19} style={{padding:5}}>
                <Input value={etiqueta} placeholder='Clave' onClick={()=>{

                }} onChange={(x)=>{
                    traerTabla()
                }}/>
                </Col>
                <Col>
                <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                    setEstado(0)
                    ORDBY()
                    setord("SUM_NUMCTRL")
                    traerTabla()
                }}><img src={az}/></button>
                </Col> */}

                <Col lg={11} md={10} sm={10} xs={20} style={{padding:5}}>
                <Input value={etiqueta} placeholder='Etiqueta' onClick={()=>{

                }} onChange={(x)=>{
                    setEtiqueta(x.target.value)
                    traerTabla()
                }}/>
                </Col>
                <Col>
                <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                    setEstado(0)
                    ORDBY()
                    setord("SUM_ETIQUETA")
                    traerTabla()
                }}><img src={az}/></button>
                </Col>
                <Col offset={1}>
                <Button type="danger" htmlType="submit" onClick={()=>{
                    setord("")
                    setBY("")
                    setEtiqueta("")
                    traerTabla()
                }}>
                Limpiar Filtros
                </Button>
                </Col>
            </Row>
            <Table showHeader={false}  pagination={{position:["bottomCenter"]}} columns={columns} dataSource={data}/>
            <Modal title="Editar menú" okText="Actualizar" cancelText="Regresar" visible={edit} onCancel={()=>{
                setEdit(false)
            }} onOk={()=>{
                if(editMenu?.SUM_ETIQUETA==""){
                    setEdit(false)
                    Modal.error({
                        title: 'Debes llenar los campos!',
                        okType:'danger'
                    })
                }
                else{
                    onUpdateRegister()
                    setEdit(false)
                }
            }}>
                <label>Etiqueta</label>
                <Input value={editMenu?.SUM_ETIQUETA} required={true} onChange={(x)=>{
                    setEditMenu((pre)=>{
                        return {...pre, SUM_ETIQUETA: x.target.value}
                    })
                }}/><br></br><br></br>
            </Modal>
        </div>
    )
}

export default SubMenu;
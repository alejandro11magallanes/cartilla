import { Button, Col, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import az from '../../imagenes/az.jpg'
import '../componentes.css'
import FormRaza from "./FormSaveRaza";

const urlApi = ' http://127.0.0.1:4444/raza';

const MenuRaza = () =>{
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [nombre, setNombre] = useState("")
    const [ORD, setORD] = useState("RAZ_NOMBRE")
    const [BY, setBY] = useState("ASC")

    useEffect(()=>{
        traerTabla()
    },[nombre, BY])

    const traerTabla = async () => {
        axios.post(urlApi, {RAZ_NOMBRE:nombre, ORDER:ORD, BY: BY},{
    
            "headers": {
            
            "content-type": "application/json",
            
            },
            
            }).then((response) =>
        setData(response.data)
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
                axios.delete(urlApi+ "/" + id.RAZ_NUMCTRL).then((response)=>{
                    traerTabla()
                })
            }
        })
    }

    const onUpdate=(id)=>{
        setEdit(true)
        setEditMenu({...id})
    }

    const onUpdateRegister=()=>{
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk:()=>{
                const data={RAZ_NOMBRE: editMenu?.RAZ_NOMBRE}
                console.log(data)
                axios.put(urlApi+ "/" + editMenu?.RAZ_NUMCTRL,data).then((response)=>{
                    traerTabla()
                })
            }
        })
    }

    const columns = [
        {
            title: 'Clave',
            dataIndex: 'RAZ_NOMBRE',
            key: 'RAZ_NOMBRE',
            width: '70%',
          },
      {
          title: 'Acción',
          key: 'ASU',
          width: '30%',
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

    const ordenar = () =>{
        if(BY == "ASC"){
            setBY("DESC")
        }
        else{
            setBY("ASC")
        }
    }

    return(
        <div>
            <Row>
                <Col>
                <FormRaza/>
                </Col>
            </Row><br></br>
            <Row>
                <Col lg={6} style={{padding:5}}>
                <Input value={nombre} placeholder="Raza" onChange={(x)=>{
                    setNombre(x.target.value)
                    traerTabla()
                }}/>
                </Col>
                <Col>
                <button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                    ordenar()
                    traerTabla()
                }}><img src={az}/></button>
                </Col>
                <Col lg={1} md={2} sm={2} style={{padding:5}}>
                <Button type="danger" htmlType="submit" onClick={()=>{
                    setNombre("")
                    setBY("ASC")
                    traerTabla()
                }}>
                Limpiar Filtros
                </Button>
            </Col>
            </Row><br></br>
            <Table showHeader={false}  pagination={{position:["bottomCenter"]}} columns={columns} dataSource={data}/>

            <Modal title="Editar menú" okText="Actualizar" cancelText="Regresar" visible={edit} onCancel={()=>{
                setEdit(false)
            }} onOk={()=>{
                onUpdateRegister()
                setEdit(false)
            }}>
                <label>Clave</label>
                <Input value={editMenu?.RAZ_NOMBRE} required={true} onChange={(x)=>{
                    setEditMenu((pre)=>{
                        return {...pre, RAZ_NOMBRE: x.target.value}
                    })
                }}/><br></br><br></br>
            </Modal>

        </div>
    )

}
export default MenuRaza
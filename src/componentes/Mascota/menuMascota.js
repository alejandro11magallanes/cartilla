import { Button, Col, Input, Modal, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import az from '../../imagenes/az.jpg'
import '../componentes.css'
import FormMAS from "./FormSaveMas";

const urlApi = ' http://127.0.0.1:4444/mascota';

const MenuMascota = () =>{
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [nombre, setNombre] = useState("")
    const [ORD, setORD] = useState("MAS_NOMBRE")
    const [BY, setBY] = useState("ASC")

    useEffect(()=>{
        traerTabla()
    },[nombre, BY])

    const traerTabla = async () => {
        axios.post(urlApi, {MAS_NOMBRE:nombre, ORDER:ORD, BY: BY},{
    
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
            title: 'MASCOTA',
            dataIndex: 'MAS_NOMBRE',
            key: 'MAS_NOMBRE',
            width: '20%',
          },
          {
            title: 'PROPIETARIO',
            dataIndex: 'PRO_NOMBRE',
            key: 'PRO_NOMBRE',
            width: '20%',
          },
          {
            title: 'MAS_FECHANAC',
            dataIndex: 'MAS_FECHANAC',
            key: 'MAS_FECHANAC',
            width: '20%',
          },
          {
            title: 'MAS_RAZA',
            dataIndex: 'MAS_RAZA',
            key: 'MAS_RAZA',
            width: '20%',
          },          {
            title: 'MAS_SEXO',
            dataIndex: 'MAS_SEXO',
            key: 'MAS_SEXO',
            width: '10%',
          },
      {
          title: 'Acción',
          key: 'ASU',
          width: '10%',
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
                <FormMAS/>
                </Col>
            </Row><br></br>
            <Row>
                <Col lg={6} style={{padding:5}}>
                <Input value={nombre} placeholder="Nombre" onChange={(x)=>{
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
                <label>Nombre</label>
                <Input value={editMenu?.MAS_NOMBRE} required={true} onChange={(x)=>{
                    setEditMenu((pre)=>{
                        return {...pre, MAS_NOMBRE: x.target.value}
                    })
                }}/><br></br><br></br>
            </Modal>

        </div>
    )

}
export default MenuMascota
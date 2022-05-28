import React, { useState, useEffect } from 'react';
import axios from "axios";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import 'antd/dist/antd.min.css';
import {Button, Col, Form, Input, message, Modal, Row, Select, Table, Upload} from 'antd';
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

    const [fileList, setFileList] = useState([])
    const [valid, setValid] = useState("")
    const [img, setImg] = useState("")

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
        console.log(fileList.length)
        console.log(img.length)
    },[fileList, img])


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
                var im
                console.log(editMenu?.MEN_ICON.length)
                console.log(img.length)
                if(img.length == 0){
                    const data={MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE, MEN_DESC: editMenu?.MEN_DESC }
                    console.log(data)
                    axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                        traerTabla()
                    })
                }
                else{
                    const data={MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE,MEN_ICON:img, MEN_DESC: editMenu?.MEN_DESC }
                    console.log(data)
                    axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                        traerTabla()
                    })
                }
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
          width: '20%',
      },
      {
          title:"Iconos",
          dataIndex:"MEN_ICON",
          key:"MEN_ICON",
          width:"20%",
          render:(record)=>{
              return <>
              <img width={40} height={40} src={record}></img>
              </>
          }
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

    const beforeUpload = (files) => {
        const isJpgOrPng = files.type === 'image/jpeg';
        const isLt2M = files.size / 1024 / 1024 < 2;
      
        if (!isJpgOrPng) {
          message.error('Solo puedes subir archivos JPG!');
          setValid("NO")
        }
        else{
          setValid("YES")
        }
      
        if (!isLt2M) {
          message.error('La imagen no debe pesar más de 2 MB!');
          setValid("NO")
        }
  
        return isJpgOrPng && isLt2M;
      };

      const handleChan = ({fileList: newFileList}) => {
        if(valid == "NO"){
        }
        else{
          if (newFileList.status !== "uploading") {
            setFileList(newFileList);
          }
        }
      };
    
      const onPreview = async (file) => {
        const dato = new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
    
          reader.onload = () =>resolve(reader.result);
      })
    
      const str = await dato
    
      setImg(str)
    }

  return (
    <div>

        <div>

        <Form>
            <Row>
            <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={clv} placeholder='Clave' onClick={()=>{
                setnmb("")
                setdes("")
            }} onChange={(x)=>{
                setclv(x.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                setord("MEN_CLAVE")
                traerTabla()
            }}><img src={az}/></button>
            </Col>
            <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={nmb} placeholder="Nombre" onClick={()=>{
                setclv("")
                setdes("")
            }} onChange={(a)=>{
                setnmb(a.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setord("MEN_NOMBRE")
                traerTabla()
            }}><img src={az}/></button>
            </Col>
            <Col lg={5} md={4} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={des} placeholder="Descripción" onClick={()=>{
                setclv("")
                setnmb("")
            }} onChange={(b)=>{
                setdes(b.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setord("MEN_DESC")
                traerTabla()
            }}><img src={az}/></button>
            </Col>
            <Col lg={2} md={2} sm={2} offset={1} style={{padding:5}}>
            <Form.Item>
        <Button type="danger" htmlType="submit" onClick={()=>{
            setdes("")
            setclv("")
            setnmb("")
            setord("")
            traerTabla()
        }}>
          Limpiar Filtros
        </Button>
      </Form.Item>
            </Col>
            </Row>
        </Form>
        </div>

        <Table showHeader={false}  pagination={{position:["bottomCenter"]}} columns={columns} dataSource={data}/>
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

        <Upload beforeUpload={(x)=>{
        onPreview(x)
        beforeUpload(x)
        return false}}
        accept='.jpg'
        listType="picture-card"
        fileList={fileList}
        onChange={handleChan}
        >
        {fileList.length < 1 && '+ Subir'}
        </Upload>

        </Modal>
    </div>
  )
}

export default TableMenu
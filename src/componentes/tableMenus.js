import React, { useState, useEffect } from 'react';
import axios from "axios";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import 'antd/dist/antd.min.css';
import {Button, Col, Form, Input, message, Modal, Row, Select, Table, Upload} from 'antd';
import Item from 'antd/lib/list/Item';
import './componentes.css'
import az from '../imagenes/az.jpg'
import { Autocomplete, TextField } from '@mui/material';
const urlApi = ' http://127.0.0.1:4444/menu';
const urlApisub = ' http://127.0.0.1:4444/submenu';
const urlApic = ' http://127.0.0.1:4444/menu/count';

function TableMenu() {

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [datasub, setDatasub] = useState([])
    const [editMenu, setEditMenu] = useState(null);
    const [clv, setclv] = useState("");
    const [submen, setSubmen] = useState("")
    const [nmb, setnmb] = useState("");
    const [des, setdes] = useState("");
    const [ord, setord] = useState("MEN_CLAVE")
    const [mo, setMo] = useState("")
    const [estado, setEstado] = useState(0)
    const [BY, setBY] = useState("")
    const [fileList, setFileList] = useState([])
    const [valid, setValid] = useState("")
    const [img, setImg] = useState("")

    const { Option } = Select;

    const NUMERO ="", LIM1=0

    const body2 = JSON.stringify({
        "SUM_ETIQUETA": "",
        "ORDER":"",
        "BY":"",
      })
  
      const traerTabla2 = async () => {
        axios.post(urlApisub, body2,{
  
            "headers": {
            
            "content-type": "application/json",
            
            },
            
            }).then((response) =>
        setDatasub(response.data)
        ).catch(error =>{
            console.log(error);
        })
    }

    const body = JSON.stringify({
      "MEN_NUMCTRL":NUMERO,
      "MEN_CLAVE":clv,
      "MEN_NOMBRE":nmb,
      "MEN_DESC":des,
      "SUM_ETIQUETA":submen,
      "MEN_ORDEN":mo,
      "ORDER":ord,
      "BY":BY
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
        traerTabla2()
        // console.log(fileList.length)
        // console.log(img.length)
    },[fileList, img, ord, BY, des, clv, nmb, submen, mo])


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
                var cantidad = 0
                for (let index = 0; index < data.length; index++) {
                    if(data[index].SUM_NUMCTRL == editMenu?.SUM_NUMCTRL){
                        cantidad = cantidad+1
                    }
                }
                if(editMenu?.MEN_ORDEN > cantidad){
                    message.error({ content: 'Elegiste un orden mayor al limite!', duration: 4, style: {
                        marginTop: '18vh',
                    }, });
                }
                else if(editMenu?.MEN_ORDEN <= 0){
                    message.error({ content: 'Elegiste un orden menor al limite!', duration: 4, style: {
                        marginTop: '18vh',
                    }, });
                }
                else{
                    var im
                    console.log(editMenu?.MEN_ICON.length + " edit")
                    console.log(img.length)
                    if(img.length != 0 && valid == "YES"){
                        const data={MEN_ORDEN:editMenu?.MEN_ORDEN,MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE,MEN_ICON:img, MEN_DESC: editMenu?.MEN_DESC, SUM_NUMCTRL:editMenu?.SUM_NUMCTRL }
                        console.log(data)
                        axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                            traerTabla()
                        })
                    }
                    else {      
                        const data={MEN_ORDEN:editMenu?.MEN_ORDEN,MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE, MEN_DESC: editMenu?.MEN_DESC, SUM_NUMCTRL:editMenu?.SUM_NUMCTRL }
                        console.log(data)
                        axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                            traerTabla()
                        })
                    }
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
        title: 'sum',
        dataIndex: 'SUM_ETIQUETA',
        key:"SUM_ETIQUETA",
        width: '20%',
    },
    {
        title: 'orden',
        dataIndex: 'MEN_ORDEN',
        key:"MEN_ORDEN",
        width: '6%',
    },
    {
        title:"Iconos",
        dataIndex:"MEN_ICON",
        key:"MEN_ICON",
        width:"6%",
        render:(record)=>{
            return <>
            <img width={30} height={30} src={record}></img>
            </>
        }
    },
      {
          title: 'Acción',
          key: 'ASU',
          width: '8%',
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
        const isJpgOrPng = files.type === 'image/png';
        const isLt2M = files.size / 1024 / 1024 < 2;
      
        if (!isJpgOrPng) {
          message.error('Solo puedes subir archivos PNG!');
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

    const existentes =()=>{
        for (let index = 0; index < datasub.length; index++) {
          const element = {label:datasub[index].SUM_ETIQUETA, valor:datasub[index].SUM_NUMCTRL}
          exist.push(element)
        }
      }
    
    const exist = []

    const ORDBY = () =>{
        if(estado == 0){
            setEstado(1)
            setBY("ASC")
        }else if(estado == 1){
            setEstado(0)
            setBY("DESC")
        }
    } 

  return (
    <div>

        <div>
        <Form>
            <Row>
            <Col lg={4} md={3} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={clv} placeholder='Clave' onClick={()=>{
                setnmb("")
                setdes("")
                setSubmen("")
                setMo("")
            }} onChange={(x)=>{
                setclv(x.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}}  className='btn-transparente' onClick={()=>{
                setBY(0)
                ORDBY()
                setord("MEN_CLAVE")
                traerTabla()
            }}><img src={az}/></button>
            </Col>
            <Col lg={4} md={3} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={nmb} placeholder="Nombre" onClick={()=>{
                setclv("")
                setdes("")
                setSubmen("")
                setMo("")
            }} onChange={(a)=>{
                setnmb(a.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setBY(0)
                ORDBY()
                setord("MEN_NOMBRE")
                traerTabla()
            }}><img src={az}/></button>
            </Col>
            <Col lg={4} md={3} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={des} placeholder="Descripción" onClick={()=>{
                setclv("")
                setnmb("")
                setSubmen("")
                setMo("")
            }} onChange={(b)=>{
                setdes(b.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setBY(0)
                ORDBY()
                setord("MEN_DESC")
                traerTabla()
            }}><img src={az}/></button>
            </Col>

            <Col lg={4} md={3} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={submen} placeholder="Submenú" onClick={()=>{
                setclv("")
                setdes("")
                setnmb("")
                setMo("")
            }} onChange={(a)=>{
                setSubmen(a.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setBY(0)
                ORDBY()
                setord("SUM_ETIQUETA")
                traerTabla()
            }}><img src={az}/></button>
            </Col>

            <Col lg={2} md={3} sm={3} xs={19} style={{padding:5}}>
            <Form.Item>
            <Input value={mo} placeholder="Orden" onClick={()=>{
                setclv("")
                setdes("")
                setnmb("")
                setSubmen("")
            }} onChange={(a)=>{
                setMo(a.target.value)
                traerTabla()
            }}/>
            </Form.Item>
            </Col>
            <Col>
            <button style={{float:"right"}} className='btn-transparente' onClick={()=>{
                setBY(0)
                ORDBY()
                setord("MEN_ORDEN")
                traerTabla()
            }}><img src={az}/></button>
            </Col>

            <Col lg={1} md={2} sm={2} style={{padding:5}}>
            <Form.Item>
        <Button type="danger" htmlType="submit" onClick={()=>{
            setSubmen("")
            setMo("")
            setdes("")
            setclv("")
            setnmb("")
            setord("MEN_CLAVE")
            setBY("")
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

        <Autocomplete onClick={existentes()} onChange={(evemt, value)=>setEditMenu((pre)=>{
            return {...pre, SUM_NUMCTRL: value.valor}
        })}
        disablePortal
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option)=> option.valor}
        id="combo-box-demo"
        options={exist}
        sx={{ width: 315}}
        renderInput={(params) => <TextField {...params} label={editMenu?.SUM_ETIQUETA} />}
        /><br></br>
        <label>Orden</label>
        <Input value={editMenu?.MEN_ORDEN} placeholder="ORDEN" onChange={(x)=>{
            setEditMenu((pre)=>{
                return {...pre, MEN_ORDEN: x.target.value}
            })
        }}/><br></br><br></br>

        <Upload beforeUpload={(x)=>{
        onPreview(x)
        beforeUpload(x)
        return false}}
        accept='.png'
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
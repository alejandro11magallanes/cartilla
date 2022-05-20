import React, { useState, useEffect } from 'react';
import axios from "axios";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import 'antd/dist/antd.min.css';
import {Input, Modal, Select, Table} from 'antd';
import Item from 'antd/lib/list/Item';
const urlApi = ' http://127.0.0.1:4444/menu';

function TableMenu() {

    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [editMenu, setEditMenu] = useState(null);

    const { Option } = Select;

    const traerTabla = async () => {
        axios.get(urlApi).then((response) =>
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
                    window.setTimeout(function(){
                        window.location.reload();
                    })
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
                const data={MEN_CLAVE: editMenu?.MEN_CLAVE, MEN_NOMBRE: editMenu?.MEN_NOMBRE }
                console.log(data)
                axios.put(urlApi+ "/" + editMenu?.MEN_NUMCTRL,data).then((response)=>{
                    window.setTimeout(function(){
                        window.location.reload();
                    })
                })
            }
        })
    }
      
    const columns = [
        {
            title: 'Clave',
            dataIndex: 'MEN_CLAVE',
            key: 'MEN_CLAVE',
            
          },
      {
        title: 'Nombre',
        dataIndex: 'MEN_NOMBRE',
        key: 'MEN_NOMBRE',
        width: '50%',
        
      },
      {
          title: 'Acción',
          key: 'ASU',
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
        <Select placeholder="Tipo de Usuario" defaultValue="Proveedor de servicios o Comercio" style={{ width: '100%' }}>
          <Option className='valor'>Seleccion</Option>
          <Option className='valor'>Seleccion</Option>
        </Select><br></br><br></br>
        </div>

        <Table columns={columns} dataSource={data}/>
        <Modal title="Editar menú" visible={edit} onCancel={()=>{
            setEdit(false)
        }} onOk={()=>{
            onUpdateRegister()
            setEdit(false)
        }}>
            <label>Clave</label>
            <Input placeholder={editMenu?.MEN_CLAVE} onChange={(x)=>{
                setEditMenu((pre)=>{
                    return {...pre, MEN_CLAVE: x.target.value}
                })
            }}/><br></br><br></br>
            <label>Nombre</label>
            <Input placeholder={editMenu?.MEN_NOMBRE} onChange={(x)=>{
                setEditMenu((pre)=>{
                    return {...pre, MEN_NOMBRE: x.target.value}
                })
            }}/>

        </Modal>
    </div>
  )
}

export default TableMenu
import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'antd/dist/antd.min.css';
import {Table} from 'antd';
const urlApi = ' http://127.0.0.1:4444/tipousu';

function TipoUsuario() {


    const [data, setData] = useState([]);

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

   
      
    const columns = [
        {
            title: 'Clave',
            dataIndex: 'TIU_NUMCTRL',
            key: 'TIU_NUMCTRL',
            
          },
      {
        title: 'Nombre',
        dataIndex: 'TIU_NOMBRE',
        key: 'TIU_NOMBRE',
        width: '50%',
        
      }
    ];

  return (
    <div>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TipoUsuario
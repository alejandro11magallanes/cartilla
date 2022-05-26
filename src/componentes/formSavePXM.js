import { Form, Input, Button, message} from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import TextField  from '@mui/material/TextField';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './componentes.css';
import 'antd/dist/antd.min.css';
import userEvent from '@testing-library/user-event';

const {Item} = Form;
const urlApi = 'http://127.0.0.1:4444/proxmen/create'
const urlApi2 = 'http://127.0.0.1:4444/programa'

function FormPXM (props){
    const [prg, setprg] = useState(null)
    const [mens, setmens] = useState(null)
    const key = 'updatable';
    const [data, setData] = useState([]) 
    const [orden, setOrden] = useState(0)

    const traerTabla = async () => {
        axios.post(urlApi2, {PRG_NUMCTRL:"",PRG_CLAVE:"", PRG_NOMBRE:"", PRG_RUTA:"", PRG_DESC:"", ORDER:"", BY:"", LIMIT1:0, LIMIT2:9999},{
    
          "headers": {
          
          "content-type": "application/json",
          
          },
          
          }).then((response) =>
        setData(response.data)
        ).catch(error =>{
            console.log(error);
        })
    }

    const onFinish =async () => {
        await axios.post(urlApi,{PRG_NUMCTRL: prg, MEN_NUMCTRL: mens, PXM_ORDEN: orden}).then((response)=>{
            console.log(response.data);
            message.loading({ content: 'Ingresando Datos...',duration: 2, key,style: {
            marginTop: '18vh',
            }, });
            setTimeout(() => {
            message.success({ content: 'Datos Registrados', key, duration: 2, style: {
                marginTop: '18vh',
            }, });
            }, 1000);
            window.setTimeout(function() {
            window.location.reload()
        }, 4000);
        }).catch(errorInfo =>{
            console.log(errorInfo);
            message.loading({ content: 'Verificando...', key,style: {
            marginTop: '18vh',
            }, });
            setTimeout(() => {
            message.error({ content: 'Por favor verifica que los datos se han llenado de manera correcta!', key, duration: 4, style: {
                marginTop: '18vh',
            }, });
            }, 1000);
        })
    };

  const handleChange=(text)=>{
    setprg(text)
    setmens(props.valor)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
    traerTabla()
  },[])

  const formatear =()=>{
    for (let index = 0; index < data.length; index++) {
      const element = {label:data[index].PRG_NOMBRE, valor:data[index].PRG_NUMCTRL}
      top100Films.push(element)
    }
  }

  const top100Films = []
  const list = []
  
  return (
    <div>
      <Form
      name="login"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    <Form.Item wrapperCol={{
          span: 4,
          offset:4,
        }}
        name="PRG_NUMCTRL"
        rules={[
          {
            required: true,
            message: 'Inserta un programa!',
          },
        ]}
      >
{/*         <Input onChange={(x)=>handleChange(x.target.value)}/> */}
        <Autocomplete onClick={formatear()} onChange={(evemt, value)=>handleChange(value.valor)}
        disablePortal
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option)=> option.valor}
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Programa" />}
        />
      </Form.Item>

      <Form.Item 
        wrapperCol={{
          span: 4,
          offset:4,
        }}
        name="PXM_ORDEN"
        rules={[
          {
            required: true,
            message: 'Inserta el orden!',
          },
        ]}
      >
        <TextField sx={{ width: 300 }}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
              }
          }}
         onChange={(x)=>setOrden(x.target.value)}
         label="Orden"/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default FormPXM;
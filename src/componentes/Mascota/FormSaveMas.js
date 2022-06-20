import { Form, Input, Modal, Button, message, Col, Row, Select} from 'antd';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import '../componentes.css';
import 'antd/dist/antd.min.css';
import { styled } from "@mui/material/styles";
import image from '../../imagenes/plus.png'
import '../menuProp.css'
import Cookies from 'universal-cookie';
import { Autocomplete, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Option } from 'antd/lib/mentions';
import TextArea from 'antd/lib/input/TextArea';

const {Item} = Form;
const urlApi = 'http://127.0.0.1:4444/mascota/create'
const urlApi2 = 'http://127.0.0.1:4444/raza'

const FormMAS = ()=>{
  const cookie = new Cookies()
    const key = 'updatable';
    const [data, setData] = useState([])
    const [raza, setRaz] = useState(0)
    const [raza2, setRaz2] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = React.useState(null);
    const [sexo, setSex] = useState("Macho")
    const [nombre, setNombre] = useState("")
    const [sen, setSen] = useState("")

    useEffect(()=>{
      traerTabla()
    },[raza, sexo, nombre, value])

    const traerTabla = async () => {
      axios.post(urlApi2, {RAZ_NUMCTRL:""},{
  
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
        await axios.post(urlApi,{PRO_NUMCTRL:cookie.get("usuarioID"),MAS_NOMBRE:nombre, MAS_FECHANAC:value, MAS_RAZA:raza2, RAZ_NUMCTRL:raza, MAS_SEXO:sexo, MAS_SENPAR:sen}).then((response)=>{
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
                window.location.reload();
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const existentes =()=>{
    for (let index = 0; index < data.length; index++) {
      const element = {label:data[index].RAZ_NOMBRE, valor:data[index].RAZ_NUMCTRL}
      op.push(element)
    }
  }

  const op = []
  
  return (
    <div>
          <a onClick={showModal}>
        <img src={image} width={50} style={{float:'left'}} alt=""/>
    </a>
    <Row>
    <Col lg={24}><h1 className='user-type' style={{marginLeft:20}}>Mascota</h1></Col>
    </Row>
    <Modal okButtonProps={{ style: { display: 'none' } }} title="Agregar mascota" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <Form
      name="login"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

<Item name="RAZ_NOMBRE"
        wrapperCol={{
          span: 16,
          offset:4,
        }}
        rules={[{
            required: true,
            message: 'Ingresa un nombre'
        }] 
        }>
            <Input placeholder='Nombre' onChange={(x)=>setNombre(x.target.value)}/>
        </Item>

        <Form.Item wrapperCol={{
          span: 4,
          offset:4,
        }}
        name="SUM_NUMCTRL"
        rules={[
          {
            required: true,
            message: 'Selecciona una raza!',
          },
        ]}
      >
        <Autocomplete onClick={existentes()} onChange={(evemt, value)=>setRaz(value.valor)}
        disablePortal
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option)=> option.valor}
        id="combo-box-demo"
        options={op}
        sx={{ width: 315}}
        renderInput={(params) => <TextField {...params} label="Raza" />}
        />
      </Form.Item>

      <Item name="RAZA"
        wrapperCol={{
          span: 16,
          offset:4,
        }}
        rules={[{
            required: true,
            message: 'Ingresa un nombre de raza'
        }] 
        }>
            <Input placeholder='Nombre de raza' onChange={(x)=>setRaz2(x.target.value)}/>
        </Item>

      <Form.Item wrapperCol={{
          span: 12,
          offset:4,
        }}
        name="NUMCTRL"
        rules={[
          {
/*             required: true,
            message: 'Selecciona una fecha!', */
          },
        ]}
      >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha de nacimiento"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  console.log(value)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
      </Form.Item>

      <Form.Item wrapperCol={{
          span: 16,
          offset:4,
        }}
        name="SEXO"
        rules={[
          {
            required: true,
            message: 'Selecciona un sexo!',
          },
        ]}
      >
        <Select placeholder="Sexo" defaultValue="Macho" style={{ width: '100%' }} onChange={(x)=>setSex(x)}>
          <Option value="Macho">Macho</Option>
          <Option value="Hembra">Hembra</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{
          span: 16,
          offset:4,
        }}
        name="SEÑAS"
        rules={[
          {
            required: true,
            message: 'Escribe una descripción!',
          },
        ]}
      >
        <TextArea placeholder='Señas particulares' rows={4} onChange={(x)=>setSen(x.target.value)}/>
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
    </Modal>
    </div>
  );
};

export default FormMAS;
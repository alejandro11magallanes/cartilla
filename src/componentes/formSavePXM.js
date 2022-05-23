import { Form, Input, Button, message} from 'antd';
import axios from "axios";
import React, { useState } from 'react';
import './componentes.css';
import 'antd/dist/antd.min.css';

const {Item} = Form;
const urlApi = 'http://127.0.0.1:4444/proxmen/create'

function FormPXM (props){
    const [prg, setprg] = useState(null)
    const [mens, setmens] = useState(null)
    const key = 'updatable';
    const PR = "SOY VALOR"
    const onFinish =async () => {
        await axios.post(urlApi,{PRG_NUMCTRL: prg, MEN_NUMCTRL: mens}).then((response)=>{
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
          span: 12,
        }}
        label="Programa"
        name="PRG_NUMCTRL"
        rules={[
          {
            required: true,
            message: 'Inserta un programa!',
          },
        ]}
      >
        <Input onChange={(x)=>{
          setprg(x.target.value)
          setmens(props.valor)
        }}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 6,
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
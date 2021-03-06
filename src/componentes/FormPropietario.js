import React from 'react';
import 'antd/dist/antd.min.css';
import { Form, Input, Button,message} from 'antd';
import './componentes.css';
import axios from "axios";

const {Item} = Form;
const urlApi = 'http://127.0.0.1:4444/usuario/propietario/register'

const FormProp = () => {

  const key = 'updatable';
  const onFinish =async (values) => {
      console.log(values);
      await axios.post(urlApi,values).then((response)=>{
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
          window.location.href = './';
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

    const formItemLayout = {
      labelCol: {
        xs:{
          span: 12,
        },
        sm:{
          span:8,
        },
      },
      wrapperCol:{
        xs:{
          span: 4,
        },
        sm:{
          span: 20,
        },
      }
    };

  return(
    <div>
      <br/>
      
      <Form name='login' onFinish={onFinish} onFinishFailed={onFinishFailed} {...formItemLayout}>
        <Item label='Nombre' name="PRO_NOMBRE"
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu nombre de Usuario'
                }] 
                }>
                  <Input/>
                </Item>
                <Item label='Telefono' name="PRO_CELULAR"
                rules={[{
                  required: true,
                  message: 'Ingresa Tu Telefono(10 digitos)'
                }] 
                }>
                  <Input maxLength={10}/>
                </Item>
                <Item label='Correo Electronico' name="PRO_CORREO"
                rules={[{
                  required: true,
                  message: 'Ingresa tu correo Electronico'
                }] 
                }>
                  <Input/>
                </Item>
                <Item label='Contrase??a' name="PRO_CONTRA"
                rules={[{
                  required: true,
                  message: 'Ingresa tu contrase??a'
                }] 
                }>
                  <Input/>
                </Item>
               
                <Item>
                 <Button type='primary' htmlType='submit'>Registrarse</Button> 
                </Item>
      </Form>
    </div>
  )
}

export default FormProp ;

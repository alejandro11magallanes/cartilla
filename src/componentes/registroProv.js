import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Col, Row, message} from 'antd';
import './componentes.css';
import {Link} from 'react-router-dom'
import axios from "axios";

const {Item} = Form;
const {Password} = Input;
const urlApi = 'http://127.0.0.1:4444/usuario/proveedor/register'

export default class registroProv extends Component {
  render() {


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
    return (
        <div>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs={1} sm={2} md={6} lg={7}></Col>
          <Col xs={22} sm={20} md={12} lg={10}>
          <h1 className='containerSecundario'>Registro de Proveedor</h1>
          <br/>
          <Form name='login' onFinish={onFinish} onFinishFailed={onFinishFailed} {...formItemLayout}>
                <Item label='Nombre' name="PRV_NOMBRE"
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu nombre de Usuario'
                }] 
                }>
                  <Input/>
                </Item>
                <Item label='Nombre Empresa' name="PRV_PROPIETARIO"
                rules={[{
                  required: true,
                  message: 'Por favor ingresa el nombre de tu empresa'
                }] 
                }>
                  <Input/>
                </Item>
                <Item label='Telefono' name="PRV_CELULAR"
                rules={[{
                  required: true,
                  message: 'Ingresa Tu Telefono(10 digitos)'
                }] 
                }>
                  <Input maxLength={10}/>
                </Item>
                <Item label='Telefono Empresa' name="PRV_TELOFICINA"
                rules={[{
                  required: true,
                  message: 'Ingresa Tu Telefono(10 digitos)'
                }] 
                }>
                  <Input maxLength={10}/>
                </Item>
                <Item label='Correo Electronico' name="PRV_CORREO"
                rules={[{
                  required: true,
                  message: 'Ingresa tu correo Electronico'
                }] 
                }>
                  <Input/>
                </Item>
                <Item label='Contraseña' name="PRV_CONTRA"
                rules={[{
                  required: true,
                  message: 'Ingresa tu contraseña'
                }] 
                }>
                  <Input/>
                </Item>
                <div className="containerSecundario">
                <Item>
                 <Button type='primary' htmlType='submit'>Iniciar Sesion</Button> 
                </Item>
                </div>
                 
              </Form>
              <div className='containerSecundario'>
              <Link to="/">Ya tienes una cuenta? Inicia Sesión</Link>
              </div>
              <br/>
        <br/>
              <div className='containerSecundario'>
              <Link to="/registro">Registrate como Propietario de una Mascota</Link>
              </div>
              
          </Col>
          <Col xs={1} sm={2} md={6} lg={7}></Col>
        </Row>
      </div>
    )
  }
}

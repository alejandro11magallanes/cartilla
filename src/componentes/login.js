import React, { Component } from 'react';
import { Form, Input, Button, message} from 'antd';
import {Link} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import './componentes.css';
import image from "./logopiki.png";
import axios from "axios";

const {Item} = Form;
const {Password} = Input;
const urlApi = ' http://127.0.0.1:4444/usuario/login'

export default class login extends Component {

  render() {

    const onFinish = async (values) => {
      console.log(values);
      await axios.post(urlApi,values).then((response)=>{
        console.log(response.data.datos);
        message.loading({ content: 'Verificando...', key,style: {
          marginTop: '18vh',
        }, });
        setTimeout(() => {
          message.success({ content: 'Bienvenido a la Plataforma', key, duration: 2, style: {
            marginTop: '18vh',
          }, });
        }, 1000);
        window.setTimeout(function() {
          window.location.href = './inicio/menuMenus';
      }, 3000);
      }).catch(errorInfo =>{
        console.log(errorInfo);
        message.loading({ content: 'Verificando...', key,style: {
          marginTop: '18vh',
        }, });
        setTimeout(() => {
          message.error({ content: 'Nombre de Usuario o contraseña incorrectos!', key, duration: 4, style: {
            marginTop: '18vh',
          }, });
        }, 1000);
      })
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const key = 'updatable';

   

    return (
        <div className='containerPrincipal'>
          <img className='perro' src={image} alt=""/>
          <div className='containerSecundario'>
              <h1 className="tituloL">Bienvenido</h1>
              <Form name='login' onFinish={onFinish} onFinishFailed={onFinishFailed} >
                <Item  name="correo"
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu correo electronico'
                }] 
                }>
                  <Input placeholder = "Correo Electronico" />
                </Item>
                <Item  name="password"
                rules={[{
                  required: true,
                  message: 'Por favor ingresa tu contraseña'
                }] 
                }>
                  <Password placeholder = "Contraseña" />
                </Item>
                <Link to="/registro">No tienes cuenta? Presiona aquí y crea una Cuenta</Link>
                <br/>
                <br/>
                <Item>
                 <Button type='primary' htmlType='submit' block >Iniciar Sesion</Button> 
                </Item>
                
                 
              </Form>
             
          </div>
        </div>
    )
  }
}
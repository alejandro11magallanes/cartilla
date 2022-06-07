import { Form, Input, Button, message, Upload} from 'antd';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './menuProp.css'
import './componentes.css';
import 'antd/dist/antd.min.css';
import Modal from 'antd/lib/modal/Modal';
import image from '../imagenes/plus.png'

const {Item} = Form;
const urlApi = 'http://127.0.0.1:4444/submenu/create'

const FormSubMenu = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [len, setLen] = useState("")

    const key = 'updatable';
    const onFinish =async (values) => {
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

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const someMethod = () => {
        props.padre(1)
      }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
  },[len])

  const guardar = () =>{
    if(len.length != 0){
      handleCancel()
      someMethod()
    }
  }

  return (
    <div>
    <a onClick={showModal}>
        <img src={image} width={50} style={{float:'left'}} alt=""/>
    </a>
    <h1 className='user-type' style={{marginLeft:60}}>Submenús</h1>
    <Modal okButtonProps={{ style: { display: 'none' } }} title="Agregar programa a menú" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
        <Form.Item
            label="Etiqueta"
            name="SUM_ETIQUETA"
            rules={[
            {
                required: true,
                message: 'Inserta una etiqueta!',
            },
            ]}
        >
            <Input onChange={(x)=>{setLen(x.target.value)}}/>
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 6,
            span: 6,
            }}
        >
            <Button type="primary" htmlType="submit" onClick={guardar}>
            Guardar
            </Button>
        </Form.Item>
        </Form>
    </Modal>
    </div>
  );
};

export default FormSubMenu;
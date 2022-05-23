import { Modal, Button, Form } from 'antd';
import React, { useState } from 'react';
import Demo from './formSaveTypeUser';
import image from '../imagenes/plus.png'
import './menuProp.css'
import FormPXM from './formSavePXM';

function SaveModalPXM(props){

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return(
    <>
    <a onClick={showModal}>
        <img src={image} width={30} style={{float:'left'}} alt=""/>
    </a>
    <Modal okButtonProps={{ style: { display: 'none' } }} title="Agregar programa a menú" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <FormPXM valor={props.name}/>
    </Modal>
  </>
  )
}

export default SaveModalPXM
import { Modal, Button } from 'antd';
import React from 'react';
import Demo from './formSaveTypeUser';
import image from '../imagenes/plus.png'
import './menuProp.css'
import FormSubMenu from "./FormSaveSubMenu";
import { render } from '@testing-library/react';

const SaveModalSub = (props) => {
  const state = {
    loading: false,
    visible: false,
  };

  const showModal = () => {
    this.setState({
      visible: true,
    });
  };

  const handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    this.setState({ visible: false });
  };

    const { visible } = this.state;

    render(
        <>
        <a onClick={this.showModal}>
        <img src={image} width={50} style={{float:'left'}} alt=""/>
        </a>
        <h1 className='user-type' style={{marginLeft:60}}>Submenús</h1>
        <Modal
          visible={visible}
          title="Nuevo submenú"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Regresar
            </Button>
          ]}
        >

            <FormSubMenu cambio={props.change}/>

        </Modal>
      </>
    )

}

export default SaveModalSub;
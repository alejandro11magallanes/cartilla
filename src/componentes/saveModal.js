import { Modal, Button } from 'antd';
import React from 'react';
import Demo from './formSaveTypeUser';
import image from '../imagenes/plus.png'
import './menuProp.css'

class SaveModal extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <a onClick={this.showModal}>
        <img src={image} width={50} style={{float:'left'}} alt=""/>
        </a>
        <h1 className='user-type' style={{marginLeft:60}}>Tipo Usuario</h1>
        <Modal
          visible={visible}
          title="Nuevo tipo de usuario"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>
          ]}
        >

            <Demo />

        </Modal>
      </>
    );
  }
}

export default SaveModal;
import React from "react";
import { Modal, Button, Input } from "antd";

export default class ModalQueryBuilder extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(this.props);
    this.setState({
      visible: false,
    });
  };

  onChange = ({ target: { value } }) => {
    this.setState({ input:value });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    
    return (
      <div>
        <Button onClick={this.showModal}>Open Modal</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="name" input={this.props} onChange={this.onChange} />
         
        </Modal>
      </div>
    );
  }
}

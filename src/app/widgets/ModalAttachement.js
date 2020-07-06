import React from "react";
import { Modal, Button, Icon } from "antd";
import { Formik, Form } from "formik";
import AttachementList from "./AttachementList";

class ModalAttachementList extends React.Component {
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
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="ghost" onClick={this.showModal}>
          <Icon type="cloud-download" />
        </Button>
        <Modal
          visible={visible}
          title="Attachement list"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <div className="inputContainer">
            <AttachementList />
          </div>
        </Modal>
      </div>
    );
  }
}
export default ModalAttachementList;

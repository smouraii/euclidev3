import React from "react";
import { Modal, Button, Icon, Select, Alert, Input } from "antd";
import { Formik, Form } from "formik";




const { Option } = Select;

class ModalAddRole extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
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
        <Icon type="plus-circle" /> Add User Role 
        </Button>
        <Modal
          visible={visible}
          title="New Folder"
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
            </Button>
          ]}
        >
          <Formik
            initialValues={{
              Description: "",
              Types: "",
              Products: "",
              Analysis: "",
              Comments: "",
              
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleFocus,
              handleSubmit
            }) => (
              <Form>
                <div className="inputContainer">
                <label>User Roles Description</label>
                <Input placeholder="Title"/>

                <label>User Roles AUthority</label>
                <Input placeholder="User Roles AUthority" disabled/>
                   
                  </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
export default ModalAddRole;

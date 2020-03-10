import React from "react";
import { Modal, Button, Icon, Select, Alert } from "antd";
import { Formik, Form } from "formik";



const { Option } = Select;

class ModalChangeRole extends React.Component {
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
        <Icon type="user" />
        </Button>
        <Modal
          visible={visible}
          title="Change Role"
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

                <Alert message="You must select a user" type="error" />
              
                    <label htmlFor="ChooseARole">New Role</label>
                    <Select
                      defaultValue="Pending"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <Option value="ChooseARole">Choose a Role</Option>
                      <Option value="Admin">Admin</Option>
                      <Option value="Client">Client</Option>
                    </Select>
                  </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
export default ModalChangeRole;

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
        <Button type="default" onClick={this.showModal}>
        <Icon type="user-add" />
        </Button>
        <Modal
          visible={visible}
          title="Activate"
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

            <div className="d-flex justify-content-center" style={{textAlign:"center"}}>
                    <label htmlFor="activate">Activate User</label>
                    <p>Are you sure, you want to activate this User</p>
                  </div>
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

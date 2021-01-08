import React from "react";
import { Modal, Button, Icon, Input, Alert } from "antd";
import { Formik, Form } from "formik";
import SwitchCompAllocate from "./SwitchCompAllocate";

const { TextArea } = Input;
const { Search } = Input;

class ModalAllocateAddresses extends React.Component {
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
        <Icon type="environment" />
        </Button>
        <Modal
          visible={visible}
          title="Allocate Addresses"
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
              Comments: ""
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
                  <Alert message="Select at least 1 Adress" type="warning" />
                  <div className="d-flex justify-content-between">
                    <div className="col-md-6">
                      <SwitchCompAllocate />
                    </div>
                    <div className="col-md-6">
                      <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center" style={{textAlign:"center"}}>
                  <label htmlFor="disable">Allocate Addresses</label>
                  <p>Allocate the addresse</p>
                  </div>
                  <TextArea rows={4} />
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
export default ModalAllocateAddresses;

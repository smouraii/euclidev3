import React from "react";
import { Modal, Button, Icon, Input, Alert } from "antd";
import { Formik, Form } from "formik";
import Search from "antd/lib/input/Search";
import SwitchCompAllocate from "./SwitchCompAllocate";
import redaxios from "redaxios";


class ModalAddUser extends React.Component {
  state = {
    loading: false,
    visible: false
  };
  addUserAPI = (data) => {
    redaxios.post(
      "http://localhost:8080/EuclideV2/saveMailConfig",({
        name:data.name,
        surname:data.surname,
        email:data.email,
        select_all:data.select_all,
        adress_selected:["",""]
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    )
    .then((res) => console.log("reponse",res))
    .catch((error) => console.log("error", error));
    console.log("addUserAPI");
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
          <Icon type="file-add" />
        </Button>
        <Modal
          visible={visible}
          title="Add a User"
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
              this.addUserAPI(data);
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
              handleSubmit
            }) => (
              <Form>
                <div className="inputContainer">
                  <label htmlFor="name">Name</label>
                  <Input
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Name"
                  />
                  {!touched.name && !errors.name && (
                    <span className="errorContainer">{errors.name}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="surname">Surname</label>
                  <Input
                    name="surname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.surname}
                    placeholder="Surname"
                  />
                  {!touched.surname && !errors.surname && (
                    <span className="errorContainer">{errors.surname}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="username">Username</label>
                  <Input
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    placeholder="Username"
                  />
                  {!touched.username && !errors.username && (
                    <span className="errorContainer">{errors.username}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="email">Email</label>
                  <Input
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email"
                  />
                  {!touched.email && !errors.email && (
                    <span className="errorContainer">{errors.email}</span>
                  )}
                </div>
                 <div className="inputContainer">
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
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
export default ModalAddUser;

import React from "react";
import { Modal, Button, Icon, Input } from "antd";
import { Formik, Form } from "formik";
import { PortletBody, Portlet } from "../partials/content/Portlet";


class ModalForm extends React.Component {
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
<>
        <Button type="ghost" onClick={this.showModal}>
          <Icon type="file-add" />
        </Button>
        <Modal
          visible={visible}
          title="Submit a issue report"
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
              handleSubmit
            }) => (
              <Form>
                <div className="inputContainer">
                  <label htmlFor="Reproductivity">Reproductivity</label>
                  <Input
                    name="Reproductivity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Reproductivity}
                    placeholder="Reproductivity"
                  />
                  {!touched.Reproductivity && !errors.Reproductivity && (
                    <span className="errorContainer">{errors.Reproductivity}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="Security">Security</label>
                  <Input
                    name="Security"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Security}
                    placeholder="Security"
                  />
                  {!touched.Security && !errors.Security && (
                    <span className="errorContainer">{errors.Security}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="Priority">Priority</label>
                  <Input
                    name="Priority"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Priority}
                    placeholder="Priority"
                  />
                  {!touched.Priority && !errors.Priority && (
                    <span className="errorContainer">{errors.Priority}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="Summary">Summary</label>
                  <Input
                    name="Summary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Summary}
                    placeholder="Summary"
                  />
                  {!touched.Summary && !errors.Summary && (
                    <span className="errorContainer">{errors.Summary}</span>
                  )}
                </div>

                <div className="inputContainer">
                  <label htmlFor="Description">Description</label>
                  <Input
                    name="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Description}
                    placeholder="Description"
                  />
                  {!touched.Description && !errors.Description && (
                    <span className="errorContainer">{errors.Description}</span>
                  )}
                </div>
                <div className="inputContainer">
                  <label htmlFor="StepToReproduce">Step To Reproduce</label>
                  <Input
                    name="StepToReproduce"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.StepToReproduce}
                    placeholder="Step To Reproduce"
                  />
                  {!touched.StepToReproduce && !errors.StepToReproduce && (
                    <span className="errorContainer">{errors.StepToReproduce}</span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
</>
    );
  }
}
export default ModalForm;

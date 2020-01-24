import React from "react";
import { Steps, Button, message, Input } from "antd";
import * as yup from "yup";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import { Formik, Field } from "formik";

const { Step } = Steps;

class StepsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  steps = [
    {
      title: "Create folder",
      content: (
        <>
          <div className="col-xl-12">
            <Formik
              initialValues={{
                RequestNum: "",
                Object: "",
                CustomerCode: "",
                Status: "",
                RequestDate: "",
                Created: ""
              }}
              onSubmit={(data, { setSubmitting }) => {
                this.next();
                console.log(data);
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
                <form onSubmit={handleSubmit}>
                  <div className="inputContainer">
                    <Input
                      name="RequestNum"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.RequestNum}
                    />
                    {!touched.RequestNum && !errors.RequestNum && (
                      <span className="errorContainer">
                        {errors.RequestNum}
                      </span>
                    )}
                  </div>
                  <div className="inputContainer">
                    <Input
                      name="Object"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Object}
                    />
                    {!touched.Object && !errors.Object && (
                      <span className="errorContainer">{errors.Object}</span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="CustomerCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.CustomerCode}
                    />
                    {!touched.CustomerCode && !errors.CustomerCode && (
                      <span className="errorContainer">
                        {errors.CustomerCode}
                      </span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="Status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Status}
                    />
                    {!touched.Status && !errors.Status && (
                      <span className="errorContainer">{errors.Status}</span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="RequestDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.RequestDate}
                    />
                    {!touched.RequestDate && !errors.RequestDate && (
                      <span className="errorContainer">
                        {errors.RequestDate}
                      </span>
                    )}
                  </div>
                  <div className="inputContainer">
                    <Input
                      name="Created"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Created}
                    />
                    {!touched.Created && !errors.Created && (
                      <span className="errorContainer">{errors.Created}</span>
                    )}
                  </div>

                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>

                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </form>
              )}
            </Formik>
          </div>
        </>
      )
    },
    {
      title: "Adding Samples/Analysis",
      content: (
        <>
          <div className="col-xl-12">
            <Formik
              initialValues={{
                Description: "",
                Types: "",
                Products: "",
                Analysis: "",
                Comments: ""
              }}
              onSubmit={(data, { setSubmitting }) => {
                this.next();
                console.log(data);
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
                <form onSubmit={handleSubmit}>
                  <div className="inputContainer">
                    <Input
                      name="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Description}
                    />
                    {!touched.Description && !errors.Description && (
                      <span className="errorContainer">
                        {errors.Description}
                      </span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="Types"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Types}
                    />
                    {!touched.Types && !errors.Types && (
                      <span className="errorContainer">{errors.Types}</span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="Products"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Products}
                    />
                    {!touched.Products && !errors.Products && (
                      <span className="errorContainer">{errors.Products}</span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="Analysis"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Analysis}
                    />
                    {!touched.Analysis && !errors.Analysis && (
                      <span className="errorContainer">{errors.Analysis}</span>
                    )}
                  </div>

                  <div className="inputContainer">
                    <Input
                      name="Comments"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Comments}
                    />
                    {!touched.Comments && !errors.Comments && (
                      <span className="errorContainer">{errors.Comments}</span>
                    )}
                  </div>

                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </form>
              )}
            </Formik>
          </div>
        </>
      )
    },
    {
      title: "Confirmation",
      content: this.props.thirdcontent
    }
  ];

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Portlet>
          <PortletBody fit={true} margin-top="50px">
            <div className="steps-content">{this.steps[current].content}</div>
          </PortletBody>
        </Portlet>
        <div className="steps-action">
          {current === this.steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default StepsComp;

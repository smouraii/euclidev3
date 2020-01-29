import React from "react";
import StepsComp from "../../widgets/Steps";
import { Button, Input } from "antd";
import { Formik, Form } from "formik";
import renderEmpty from "antd/lib/config-provider/renderEmpty";
import { any } from "prop-types";

export default function NewRequest() {
  const [current, setCurrent] = React.useState(0);
  const [dataValues, setDataValues] = React.useState({});

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <StepsComp
        next={next}
        prev={prev}
        current={current}
        firstcontent={
          <>
            <div className="row d-flex justify-content-center">
              {" "}
              <div className="col-md-6 ">
                <Formik
                  initialValues={{
                    RequestNum: "",
                    Object: "",
                    CustomerCode: "",
                    Status: "",
                    RequestDate: "",
                    Created: "",
                    ...dataValues
                  }}
                  onSubmit={(data, { setSubmitting }) => {
                    next();
                    console.log(data);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                  
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                  }) => (
                    <Form>
                      <div className="inputContainer">
                        <label htmlFor="RequestNum">Request Number</label>
                        <Input
                          name="RequestNum"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.RequestNum}
                          placeholder="RequestNum"
                        />
                        {!touched.RequestNum && !errors.RequestNum && (
                          <span className="errorContainer">
                            {errors.RequestNum}
                          </span>
                        )}
                      </div>
                      <div className="inputContainer">
                        <label htmlFor="Object">Object</label>
                        <Input
                          name="Object"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Object}
                          placeholder="Object"
                        />
                        {!touched.Object && !errors.Object && (
                          <span className="errorContainer">
                            {errors.Object}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Customer Code">Customer Code</label>
                        <Input
                          name="CustomerCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.CustomerCode}
                          placeholder="CustomerCode"
                        />
                        {!touched.CustomerCode && !errors.CustomerCode && (
                          <span className="errorContainer">
                            {errors.CustomerCode}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Status">Status</label>
                        <Input
                          name="Status"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Status}
                          placeholder="Status"
                        />
                        {!touched.Status && !errors.Status && (
                          <span className="errorContainer">
                            {errors.Status}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Request Date">Request Date</label>
                        <Input
                          name="RequestDate"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.RequestDate}
                          placeholder="RequestDate"
                        />
                        {!touched.RequestDate && !errors.RequestDate && (
                          <span className="errorContainer">
                            {errors.RequestDate}
                          </span>
                        )}
                      </div>
                      <div className="inputContainer">
                        <label htmlFor="Created">Created</label>
                        <Input
                          name="Created"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Created}
                          placeholder="Created"
                        />
                        {!touched.Created && !errors.Created && (
                          <span className="errorContainer">
                            {errors.Created}
                          </span>
                        )}
                      </div>

                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>

                      <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </>
        }
        secondcontent={
          <>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 ">
                <Formik
                  initialValues={{
                    Description: "",
                    Types: "",
                    Products: "",
                    Analysis: "",
                    Comments: "",
                    ...dataValues
                  }}
                  onSubmit={(data, { setSubmitting }) => {
                    next();
                    setDataValues(data);
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
                        <label htmlFor="Description">Description</label>
                        <Input
                          name="Description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Description}
                          placeholder="Description"
                        />
                        {!touched.Description && !errors.Description && (
                          <span className="errorContainer">
                            {errors.Description}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Types">Types</label>
                        <Input
                          name="Types"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Types}
                          placeholder="Types"
                        />
                        {!touched.Types && !errors.Types && (
                          <span className="errorContainer">{errors.Types}</span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Products">Products</label>
                        <Input
                          name="Products"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Products}
                          placeholder="Products"
                        />
                        {!touched.Products && !errors.Products && (
                          <span className="errorContainer">
                            {errors.Products}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Analysis">Analysis</label>
                        <Input
                          name="Analysis"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Analysis}
                          placeholder="Analysis"
                        />
                        {!touched.Analysis && !errors.Analysis && (
                          <span className="errorContainer">
                            {errors.Analysis}
                          </span>
                        )}
                      </div>

                      <div className="inputContainer">
                        <label htmlFor="Comments">Comments</label>
                        <Input
                          name="Comments"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.Comments}
                          placeholder="Comments"
                        />
                        {!touched.Comments && !errors.Comments && (
                          <span className="errorContainer">
                            {errors.Comments}
                          </span>
                        )}
                      </div>

                      <Button type="primary" htmlType="submit">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </>
        }
        thirdcontent={<div><pre>{JSON.stringify(dataValues)}</pre></div>}
      />
    </>
  );
}

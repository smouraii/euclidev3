import React, { useEffect } from "react";
import StepsComp from "../../widgets/Steps";
import { Button, Input, Descriptions, Divider, Transfer } from "antd";
import { Formik, Form } from "formik";
import { any } from "prop-types";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../../partials/content/Portlet";

export default function NewRequest() {
  const [mockData, setMockData] = React.useState([]);
  const [targetKeys, setTargetKeys] = React.useState([]);

  useEffect(() => {
    getMock();
  }, []);

  const getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  const handleTransfer = targetKeys => {
    setTargetKeys(targetKeys);
  };

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
      <Portlet
        className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
        fluidHeight={true}
      >
        <PortletBody>
          <StepsComp
            next={next}
            prev={prev}
            current={current}
            firstcontent={
              <>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8">
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
                        setDataValues(data);
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
                        <Portlet
                          className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                          fluidHeight={true}
                        >
                          <PortletBody>
                            <Form>
                              <div className="inputContainer">
                                <label htmlFor="RequestNum">
                                  <b>Request Number</b>
                                </label>
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
                                <label htmlFor="Object">
                                  <b>Object</b>
                                </label>
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
                                <label htmlFor="Customer Code">
                                  <b>Customer Code</b>
                                </label>
                                <Input
                                  name="CustomerCode"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.CustomerCode}
                                  placeholder="CustomerCode"
                                />
                                {!touched.CustomerCode &&
                                  !errors.CustomerCode && (
                                    <span className="errorContainer">
                                      {errors.CustomerCode}
                                    </span>
                                  )}
                              </div>

                              <div className="inputContainer">
                                <label htmlFor="Status">
                                  <b>Status</b>
                                </label>
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
                                <label htmlFor="Request Date">
                                  <b>Request Date</b>
                                </label>
                                <Input
                                  name="RequestDate"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.RequestDate}
                                  placeholder="RequestDate"
                                />
                                {!touched.RequestDate &&
                                  !errors.RequestDate && (
                                    <span className="errorContainer">
                                      {errors.RequestDate}
                                    </span>
                                  )}
                              </div>
                              <div className="inputContainer">
                                <label htmlFor="Created">
                                  <b>Created</b>
                                </label>
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
                              <div style={{ marginTop: 10 }}>
                                <Button type="primary" htmlType="submit">
                                  Next
                                </Button>
                              </div>
                            </Form>
                          </PortletBody>
                        </Portlet>
                      )}
                    </Formik>
                  </div>
                </div>
              </>
            }
            secondcontent={
              <>
                <div className="row d-flex justify-content-center">
                  <div className="col-sm-10 col-md-10 col-lg-10">
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
                        setDataValues({ ...dataValues, ...data });
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
                          <div className="row d-flex justify-content-center">
                            <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                              <PortletBody>
                                <div className="inputContainer">
                                  <label htmlFor="Description">
                                    Description
                                  </label>
                                  <Input
                                    name="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Description}
                                    placeholder="Description"
                                  />
                                  {!touched.Description &&
                                    !errors.Description && (
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
                                    <span className="errorContainer">
                                      {errors.Types}
                                    </span>
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
                              </PortletBody>
                            </Portlet>
                          </div>

                          <div className="col-md-12">
                            <Portlet
                              className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                              fluidHeight={true}
                            >
                              <PortletBody>
                                <div className="row d-flex justify-content-center">
                                  <Transfer
                                    dataSource={mockData}
                                    showSearch
                                    listStyle={{
                                      width: 250,
                                      height: 300
                                    }}
                                    operations={["to right", "to left"]}
                                    targetKeys={targetKeys}
                                    onChange={handleTransfer}
                                    render={item =>
                                      `${item.title}-${item.description}`
                                    }
                                  />
                                </div>
                              </PortletBody>
                            </Portlet>
                          </div>
                          <div>
                            <Button type="primary" htmlType="submit">
                              Next
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </>
            }
            thirdcontent={
              <>
                <Portlet
                  className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                  fluidHeight={true}
                >
                  <PortletHeader title="Create Folder" />
                  <PortletBody>
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-10 ">
                        <Descriptions>
                          <Descriptions.Item label="Request Number">
                            {dataValues.RequestNum}
                          </Descriptions.Item>
                          <Descriptions.Item label="Object">
                            {dataValues.Object}
                          </Descriptions.Item>
                          <Descriptions.Item label="Customer Code">
                            {dataValues.CustomerCode}
                          </Descriptions.Item>
                          <Descriptions.Item label="Status">
                            {dataValues.Status}
                          </Descriptions.Item>
                          <Descriptions.Item label="Request Date">
                            {dataValues.RequestDate}
                          </Descriptions.Item>
                          <Descriptions.Item label="Created">
                            {dataValues.Created}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </div>
                  </PortletBody>
                </Portlet>

                <Divider />

                <Portlet
                  className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                  fluidHeight={true}
                >
                                  <PortletHeader title="Adding Sample/Analysis" />

                  <PortletBody>
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-10 ">
                        <Descriptions>
                          <Descriptions.Item label="Description">
                            {dataValues.Description}
                          </Descriptions.Item>
                          <Descriptions.Item label="Types">
                            {dataValues.Types}
                          </Descriptions.Item>
                          <Descriptions.Item label="Products">
                            {dataValues.Products}
                          </Descriptions.Item>
                          <Descriptions.Item label="Analysis">
                            {dataValues.Analysis}
                          </Descriptions.Item>
                          <Descriptions.Item label="Comments">
                            {dataValues.Comments}
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </div>
                  </PortletBody>
                </Portlet>
              </>
            }
          />
        </PortletBody>
      </Portlet>
    </>
  );
}

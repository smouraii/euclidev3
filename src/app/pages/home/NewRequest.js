import React, { useEffect } from "react";
import StepsComp from "../../widgets/Steps";
import { Button, Input, Descriptions, Divider, Transfer } from "antd";
import { Formik, Form } from "formik";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../../partials/content/Portlet";
import EditableFormTable from "../../widgets/DatatableEditable";

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
        key: "test",
        title: `test`,
        description: `description of test`,
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
                        description: "",
                        sampleTemplate: "",
                        products: "",
                        sampleCount: "",
                        shippingLocation: "",
                        contact:"",
                        quantity:"",
                        quantityUnits:"",
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
                        <div className="row d-flex justify-content-end">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <div className="row d-flex justify-content-center">
                            <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                              <PortletBody>
                                <div className="inputContainer">
                                  <label htmlFor="description">
                                    Description
                                  </label>
                                  <Input
                                    name="description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    placeholder="Description"
                                  />
                                  {!touched.description &&
                                    !errors.description && (
                                      <span className="errorContainer">
                                        {errors.description}
                                      </span>
                                    )}
                                </div>

                                <div className="inputContainer">
                                  <label htmlFor="sampleTemplate">Sample Template</label>
                                  <Input
                                    name="sampleTemplate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sampleTemplate}
                                    placeholder="Sample Template"
                                  />
                                  {!touched.sampleTemplate && !errors.sampleTemplate && (
                                    <span className="errorContainer">
                                      {errors.sampleTemplate}
                                    </span>
                                  )}
                                </div>

                                <div className="inputContainer">
                                  <label htmlFor="products">Products</label>
                                  <Input
                                    name="products"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.products}
                                    placeholder="Products"
                                  />
                                  {!touched.products && !errors.products && (
                                    <span className="errorContainer">
                                      {errors.products}
                                    </span>
                                  )}
                                </div>

                                <div className="inputContainer">
                                  <label htmlFor="sampleCount">Sample Count</label>
                                  <Input
                                    name="sampleCount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sampleCount}
                                    placeholder="Sample Count"
                                  />
                                  {!touched.sampleCount && !errors.sampleCount && (
                                    <span className="errorContainer">
                                      {errors.sampleCount}
                                    </span>
                                  )}
                                </div>

                                <div className="inputContainer">
                                  <label htmlFor="shippingLocation">Shipping Location</label>
                                  <Input
                                    name="shippingLocation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.shippingLocation}
                                    placeholder="Shipping Location"
                                  />
                                  {!touched.shippingLocation && !errors.shippingLocation && (
                                    <span className="errorContainer">
                                      {errors.shippingLocation}
                                    </span>
                                  )}
                                </div>
                                <div className="inputContainer">
                                  <label htmlFor="contact">Contact</label>
                                  <Input
                                    name="contact"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.contact}
                                    placeholder="Contact"
                                  />
                                  {!touched.contact && !errors.contact && (
                                    <span className="errorContainer">
                                      {errors.contact}
                                    </span>
                                  )}
                                </div>
                                <div className="inputContainer">
                                  <label htmlFor="quantity">Quantity</label>
                                  <Input
                                    name="quantity"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.quantity}
                                    placeholder="Quantity"
                                  />
                                  {!touched.quantity && !errors.quantity && (
                                    <span className="errorContainer">
                                      {errors.quantity}
                                    </span>
                                  )}
                                </div>
                                <div className="inputContainer">
                                  <label htmlFor="quantityUnits">Quantity Units</label>
                                  <Input
                                    name="quantityUnits"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.quantityUnits}
                                    placeholder="Quantity Units"
                                  />
                                  {!touched.quantityUnits && !errors.quantityUnits && (
                                    <span className="errorContainer">
                                      {errors.quantityUnits}
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
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6">
                          <Portlet
                              className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                              fluidHeight={true}
                            >
                              <PortletBody>
                                <EditableFormTable/>
                              </PortletBody>
                            </Portlet>
                          </div>
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
                          <Descriptions.Item label="description">
                            {dataValues.description}
                          </Descriptions.Item>
                          <Descriptions.Item label="sampleTemplate">
                            {dataValues.sampleTemplate}
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

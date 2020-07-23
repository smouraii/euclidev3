import React, { useState } from "react";
import {
  Tabs,
  Icon,
  Button,
  Input,
  Select,
  Form,
  DatePicker,
  Upload,
  message,
} from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import { Label } from "reactstrap";
import TextArea from "antd/lib/input/TextArea";
import countryList from "react-select-country-list";
import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import { register } from "../../crud/auth.crud";
import { FormattedMessage } from "react-intl";
import PasswordValidator from "../../widgets/PasswordValidator";
import WrappedPasswordValidator from "../../widgets/PasswordValidator";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function Myprofile(props, form) {
  const countries = countryList().getData();

  const [loading, setloading] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [country, setcountry] = useState(countries);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const { getFieldDecorator } = form;

  const { TabPane } = Tabs;

  const { Option } = Select;

  const { imageUrl } = loading;

  const { intl } = props;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const changeHandler = (selectValue) => {
    setSelectValue({ selectValue });
  };

  const onchangecountry = (country) => {
    setcountry({ country });
  };

  const handleChangeUpload = (info) => {
    if (info.file.status === "uploading") {
      setloading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setloading(
          {
            imageUrl,
          },
          false
        )
      );
    }
  };

  const onRemove = () => {
    setloading(false, { imageurl: false });
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
        <PortletHeader title="MY PROFILE" />
        <PortletBody heightfluid={true}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <Icon type="book" />
                  Account Information
                </span>
              }
              key="1"
            >
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                <Form>
                  <Portlet>
                    <PortletBody>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="firstName">First Name</label>
                          <Input
                            placeholder="First Name "
                            name="firstName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="lastName">lastName Name</label>
                          <Input
                            placeholder="last Name"
                            name="lastName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <label htmlFor="birthday">Birthday</label>
                        <div className="inputContainer">
                          <DatePicker onChange={onChange} name="birthday" />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="accountName">Account Name</label>
                          <Input
                            placeholder="Account Name "
                            name="accountName"
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="mobileNumber">Mobile Number</label>
                          <Input
                            placeholder="Mobile Number "
                            name="mobileNumber"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="email">Email</label>
                          <Input
                            placeholder="Email "
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="fax">Fax</label>
                          <Input
                            placeholder="Fax "
                            name="fax"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="inputContainer">
                          <label htmlFor="function">Function</label>
                          <Input
                            placeholder="Function "
                            name="function"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 d-flex align-content-around flex-wrap bd-highlight example-parent ">
                        <div className="p-2 bd-highlight col-example">
                          <Button type="primary">Save Changes</Button>
                        </div>
                        <div className="p-2 bd-highlight col-example">
                          <Button type="gosht">Cancel</Button>
                        </div>
                      </div>
                    </PortletBody>
                  </Portlet>
                </Form>

                <PortletBody heightfluid={true}></PortletBody>
              </Portlet>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="bug" />
                  Address Information
                </span>
              }
              key="2"
            >
              <div class="form row">
                <div class="col-md-12">
                  <div class="row">
                    <Portlet className="kt-portlet--height-fluid kt-portlet">
                      <PortletHeader title="Billing Address" />
                      <PortletBody widthfluid={true}>
                        <div class="col-md-6">
                          <div class="form-group">
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="country">country</label>
                                <Select
                                  option={setcountry}
                                  value={selectValue}
                                  onChange={changeHandler}
                                  placeholder="Choose a country"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="city">City</label>
                                <input
                                  name="city"
                                  class="form-control"
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="postalCode">Postal Code</label>
                                <input
                                  name="postalCode"
                                  class="form-control"
                                  placeholder="Postal Code"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="POBOX">PO BOX</label>
                                <input
                                  name="POBOX"
                                  class="form-control"
                                  placeholder="PO BOX"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="Address">Address</label>
                                <TextArea
                                  name="Address"
                                  class="form-control"
                                  placeholder="Address"
                                  rows={4}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </PortletBody>
                    </Portlet>
                    <Portlet className="kt-portlet--height-fluid kt-portlet">
                      <PortletHeader title="Shipping Address" />
                      <PortletBody widthfluid={true}>
                        <div class="col-md-6">
                          <div class="form-group">
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="city">City</label>
                                <input
                                  name="city"
                                  class="form-control"
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="postalCode">Postal Code</label>
                                <input
                                  name="postalCode"
                                  class="form-control"
                                  placeholder="Postal Code"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="POBOX">PO BOX</label>
                                <input
                                  name="POBOX"
                                  class="form-control"
                                  placeholder="PO BOX"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="Address">Address</label>
                                <TextArea
                                  name="Address"
                                  class="form-control"
                                  placeholder="Address"
                                  rows={4}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </PortletBody>
                    </Portlet>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-exclamation" />
                  Change Profile Picture
                </span>
              }
              key="3"
            >
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                <PortletHeader title="Log Settings" />
                <PortletBody heightfluid={true}>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={handleChangeUpload}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    <div className="d-flex justify-content-start">
                      <div style={{ margin: 5 }}>
                        <Button type="primary"> Save </Button>
                      </div>
                      <div style={{ margin: 5 }}>
                        <Button onClick={() => onRemove()}>cancel</Button>
                      </div>
                    </div>
                  </div>
                </PortletBody>
              </Portlet>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="book" />
                  Change Password
                </span>
              }
              key="4"
            >
            <Portlet>
              <PortletBody>
                <PortletHeader/>
                <WrappedPasswordValidator/>
              </PortletBody>
            </Portlet>
            </TabPane>
          </Tabs>
        </PortletBody>
      </Portlet>
    </>
  );
}

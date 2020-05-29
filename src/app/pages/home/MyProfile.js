import React, { useState } from "react";
import { Tabs, Icon, Button, Input, Select, Form, DatePicker } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import { Label } from "reactstrap";
import TextArea from "antd/lib/input/TextArea";
import countryList from "react-select-country-list";

export default function Myprofile(props) {
  const [selectValue, setSelectValue] = useState(null);
  const { TabPane } = Tabs;
  const { Option } = Select;
  const countries = countryList().getData();

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const changeHandler = (selectValue) => {
    setSelectValue({ selectValue });
  };
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
                    <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                      <PortletHeader title="Billing Address" />
                      <PortletBody widthfluid={true}>
                        <div class="col-md-6">
                          <div class="form-group">
                            {/* <div className="col-sm-12">
                              <div className="inputContainer">
                                <label htmlFor="country">country</label>
                                <Select
                                  options={countries}
                                  value={selectValue}
                                  onChange={changeHandler}
                                  placeholder="Choose a country"
                                />
                              </div>
                            </div> */}
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
                    <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                      <PortletHeader title="BugReport synchronization" />
                      <PortletBody widthfluid={true}>
                        <div class="col-sm-12 col-md-12 col-lg-6">
                          <table class="table table-hover table-bordered">
                            <tbody>
                              <tr>
                                <td>issueReport customFields</td>
                                <td>
                                  <Button
                                    class="btn default"
                                    id="customFieldSync"
                                  >
                                    issueReport synchronize
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td>issueReport categories</td>
                                <td>
                                  <Button
                                    class="btn default"
                                    id="categoriesSync"
                                  >
                                    issueReport synchronize
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                  Error Log Configuration
                </span>
              }
              key="3"
            >
              <Form>
                <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                  <PortletHeader title="Log Settings" />
                  <PortletBody heightfluid={true}>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="inputContainer">
                        <label htmlFor="fileName">File Name</label>
                        <Input
                          placeholder="File Name "
                          name="fileName"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="inputContainer">
                        <label htmlFor="fileLocation">File Location</label>
                        <Input
                          placeholder="File Location"
                          name="fileLocation"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <label htmlFor="logtype">Log Type</label>
                      <div>
                        <Select
                          defaultValue="dailyRolling"
                          name="LogType"
                          title="Log Type"
                          onChange={handleChange}
                        >
                          <Option value="dailyRolling">DAILY ROLLING</Option>
                          <Option value="rechSize">REACH SIZE</Option>
                        </Select>
                      </div>
                    </div>
                  </PortletBody>
                </Portlet>
              </Form>
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
              <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                <PortletBody heightfluid={true}></PortletBody>
              </Portlet>
            </TabPane>
          </Tabs>
        </PortletBody>
      </Portlet>
    </>
  );
}

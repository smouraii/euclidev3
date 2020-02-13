import React from "react";
import { Tabs, Icon, Button, Input, Select, Form } from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import TreeComp from "../../widgets/TreeComp";

const { TabPane } = Tabs;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default function AuditConfiguration() {
  return (
    <>
      <Portlet>
        <PortletBody>
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <span>
                  <Icon type="book" />
                  Tab 1
                </span>
              }
              key="1"
            >
              <TreeComp />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="bug" />
                  Tab 2
                </span>
              }
              key="2"
            >
              <div class="form row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <h3 class="form-section">audit bugReport api</h3>

                      <div class="form-group">
                        <div class="input-group">
                          <input
                            name="apiURL"
                            class="form-control"
                            value="https://bug.euclide.io/api/soap/mantisconnect.php"
                          />
                          <span class="input-group-btn">
                            <Button id="apiURL">Update</Button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h3 class="form-section">bugReport synchronization</h3>

                      <table class="table table-hover table-bordered">
                        <tbody>
                          <tr>
                            <td>issueReport customFields</td>
                            <td>
                              <Button class="btn default" id="customFieldSync">
                                issueReport synchronize
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td>issueReport categories</td>
                            <td>
                              <Button class="btn default" id="categoriesSync">
                                issueReport synchronize
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="file-exclamation" />
                  Tab 3
                </span>
              }
              key="3"
            >
              <Form>
                <div className="inputContainer">
                  <label htmlFor="fileName">Request Number</label>
                  <Input
                    placeholder="File Name "
                    name="fileName"
                    onChange={handleChange}
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="fileLocation">Request Number</label>
                  <Input
                    placeholder="File Location"
                    name="fileLocation"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="logtype">Request Number</label>
                  <div>
                    <Select
                      defaultValue="dailyRolling"
                      name="LogType"
                      title="Log Type"
                      style={{ width: 700 }}
                      onChange={handleChange}
                    >
                      <Option value="dailyRolling">DAILY ROLLING</Option>
                      <Option value="rechSize">REACH SIZE</Option>
                    </Select>
                  </div>
                </div>
              </Form>
            </TabPane>
          </Tabs>
        </PortletBody>
      </Portlet>
    </>
  );
}

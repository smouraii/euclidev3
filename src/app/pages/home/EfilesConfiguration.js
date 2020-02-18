import React, { useState } from "react";
import { Collapse, Progress, Button, Input, Select } from "antd";
import { Circle } from "rc-progress";
import { Portlet, PortletBody } from "../../partials/content/Portlet";

const ButtonGroup = Button.Group;
const { Option } = Select;

export default function EfilesConfiguration() {
  const [state, setState] = useState(0);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const increase = () => {
    let percent = state + 10;
    if (percent > 100) {
      percent = 100;
    }
    setState({ percent });
  };

  const decline = () => {
    let percent = state - 10;
    if (percent < 0) {
      percent = 0;
    }
    setState({ percent });
  };

  const { Panel } = Collapse;
  const text = (
    <div className="row justify-content-between ">
      <div className="col-md-6">
        <Progress type="dashboard" percent={75} />
        <Input />
        <ButtonGroup>
          <Button onClick={decline} icon="minus" />
          <Button onClick={increase} icon="plus" />
        </ButtonGroup>
      </div>
      <div className="col-md-6">
        <Progress type="dashboard" percent={50} />
        <Input />
        <ButtonGroup>
          <Button onClick={decline} icon="minus" />
          <Button onClick={increase} icon="plus" />
        </ButtonGroup>
      </div>
      <div className="col-md-12">
      <Select
        defaultValue="word"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="word">Word</Option>
        <Option value="excel">Excel</Option>
        <Option value="pdf">pdf</Option>
        <Option value="text">Text</Option>
      </Select>
      </div>
    </div>
  );
  return (
    <Portlet>
      <PortletBody>
        <Collapse accordion>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </PortletBody>
    </Portlet>
  );
}

import React, { useState } from "react";
import { Collapse, Progress, Button, Input, Select, Icon } from "antd";
import { Circle } from "rc-progress";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { StaticRouter } from "react-router-dom";

const ButtonGroup = Button.Group;
const { Option } = Select;

export default function EfilesConfiguration() {
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const increase = () => {
    let percent = state + 10;
    if (percent > 100) {
      percent = 100;
    }
    setState(percent);
  };

  const decline = () => {
    let percent = state - 10;
    if (percent < 0) {
      percent = 0;
    }
    setState(percent);
  };

  const plus = () => {
    let percent = count + 10;
    if (percent > 100) {
      percent = 100;
    }
    setCount(percent );
  };

  const minus = () => {
    let percent = count - 10;
    if (percent < 0) {
      percent = 0;
    }
    setCount(percent);
  };

  const { Panel } = Collapse;
  const text = (
    <div className="row justify-content-between ">
      <div className="col-md-6">
        <Progress type="dashboard" percent={state} />
        <Input />
        <ButtonGroup>
          <Button onClick={decline} icon="minus" />
          <Button onClick={increase} icon="plus" />
        </ButtonGroup>
      </div>
      <div className="col-md-6">
        <Progress type="dashboard" percent={count} />
        <Input />
        <ButtonGroup>
          <Button onClick={minus} icon="minus" />
          <Button onClick={plus} icon="plus" />
        </ButtonGroup>
      </div>
      <div className="row">
     <div className="col-md-12">
      <Select
        defaultValue="word"
        style={{ width: 900 , margin: 10}}
        onChange={handleChange}
      >
        <Option value="word"><Icon type="file-word" />Word</Option>
        <Option value="excel"><Icon type="file-excel" />Excel</Option>
        <Option value="pdf"><Icon type="file-pdf" />Pdf</Option>
        
        <Option value="text"><Icon type="file-text" />Text</Option>
        <Option value="jpeg"><Icon type="file-jpg" />Jpeg</Option>
        <Option value="bitmap"><Icon type="file" />Bitmap</Option>
        <Option value="png"><Icon type="file-image" />Png</Option>
        <Option value="gif"><Icon type="file-exclamation" />Gif</Option>
        
      </Select>
      </div>
    </div>
    </div> 
  );
  return (
    <Portlet>
      <PortletBody>
        <Collapse accordion>
          <Panel header="This is panel header 1" key="1">
            <div>{text}</div>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <div>{text}</div>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <div>{text}</div>
          </Panel>
        </Collapse>
      </PortletBody>
    </Portlet>
  );
}

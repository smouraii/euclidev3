import React from "react";
import { Collapse } from "antd";
import { Circle } from "rc-progress";
import { Portlet, PortletBody } from "../../partials/content/Portlet";

const color ='#3FC7FA';
function getColor(index) {
  return color[(index + color.length) % color.length];
}
const { Panel } = Collapse;
const circleContainerStyle = {
    width: '200px',
    height: '200px',
  };

const text =  <div style={circleContainerStyle}>
<div>
<Circle
            percent="50"
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={color}
          />
          </div>
          <div>
          <Circle
            
            percent="50"
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={color}
          />
          </div>
</div>;
export default function EfilesConfiguration() {
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

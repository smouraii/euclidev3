import React from "react";
import { Steps, Button, message, Input } from "antd";
import * as yup from "yup";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import { Formik, Field } from "formik";

const { Step } = Steps;

const StepsComp = (props) => {
  

  const steps = [
    {
      title: "Create folder",
      content: props.firstcontent
    },
    {
      title: "Adding Samples/Analysis",
      content: props.secondcontent
    },
    {
      title: "Confirmation",
      content: props.thirdcontent
    }
  ];
    return (
      <div>
        <Steps current={props.current}> 
          {steps.map(item => (
            <Step className="stepcustom" key={item.title} title={item.title} />
          ))}
        </Steps>
        <Portlet>
          <PortletBody fit={true} margin-top="50px">
            <div className="steps-content">{steps[props.current].content}</div>
          </PortletBody>
        </Portlet>
        <div className="steps-action">
          {props.current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {props.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => props.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }


export default StepsComp;
 
import React, { useState } from "react";
import Api from "../pages/home/data/Api.json";
import { Button, Steps, Table } from "antd";
import NewRequest from "../pages/home/NewRequest";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import queryString from "query-string";
import redaxios from "redaxios";
import { Form, Formik } from "formik";
import Axios from "axios";
import Confirmation from "./Confirmation";

export default function StepsNewRequest(props) {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [wizardData, setWizardData] = useState([]);
  const [templateData, setTemplateData] = useState(null);
  const parsed = queryString.parse(props.location.search);
  console.log("propsStep",props)
  console.log("StepWizardData",wizardData)

  React.useEffect(() => {
    redaxios
      .get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getWizard`, {
        params: {
          wizardId: parsed.wizardid,
          fluxId: parsed.fluxId,
        },
        withCredentials: true,
      })
      .then((res) => setData(res.data));
  }, []);

  const prev = () => {
    setCurrent(current - 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const { Step } = Steps;

  return (
    <div>
      {/* add step save (send a request with save API)  */}
      <Portlet>
        {data !== null && data.steps && (
          <PortletBody
            className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
            fluidHeight={true}
          >
            <Steps style={{ margin: 5 }} current={current}>
              {data.steps.map((step) => (
                <Steps.Step key={step.title} title={step.title} />
              ))}
              <Step title="confirmation" />
            </Steps>
            {current !== data.steps.length && (
              <NewRequest
                prev={prev}
                next={next}
                current={current}
                wizardData={wizardData}
                wizardid={parsed.wizardid}
                fluxId={parsed.fluxId}
                setWizardData={setWizardData}
                key={data.steps[current].id}
                step={data.steps[current]}
                sdcid={data.steps[current].sdcid}
                datset={
                  data.steps[current].dataset &&
                  data.steps[current].dataset.sdcid
                }
                stepsLength={data.steps.length}
                templateData={templateData}
                setTemplateData={setTemplateData}
              />
            )}
            {current >= data.steps.length && wizardData && (
              <>
                {/* <Confirmation
                  templateData={templateData}
                  current={current}
                  data={data}
                  step=

                /> */}
                <p>hhhhhhhhhhh</p>
              </>
            )}
          </PortletBody>
        )}
      </Portlet>
    </div>
  );
}

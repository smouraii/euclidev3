import React, { useState } from "react";
import Api from "../pages/home/data/Api.json";
import { Steps } from "antd";
import NewRequest from "../pages/home/NewRequest";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import queryString from "query-string";
import redaxios from "redaxios";

export default function StepsNewRequest(props) {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [stepsData, setStepsData] = useState(null);
  const [wizardData,setWizardData]= useState({});
  const parsed = queryString.parse(props.location.search);
  console.log("parsedsteps", parsed);
  console.log("Location:", props.location.search);

  React.useEffect(() => {
    redaxios
      .get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getWizard`, {
        params: {
          wizardId: parsed.pagelistid,
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


  React.useEffect(() => {
    console.log("dataofSteps", data);
  }, [data]);
console.log(data)

  return (
    <div>
      {/* add step save (send a request with save API)  */}
      <Portlet>
        {data !== null && data.steps && (
          <PortletBody heightfluid={true}>
            <Steps style={{ margin: 5 }} current={current}>
              {data.steps.map((step) => (
                <Steps.Step key={step.title} title={step.title} />
              ))}
              <Step title="confirmation" />
            </Steps>
            <NewRequest
              prev={prev}
              next={next}
              current={current}
              wizardData={wizardData}
              setWizardData={setWizardData}
              key={data.steps[current].id}
              step={data.steps[current]}
              stepsLength={data.steps.length + 1}
            />
          </PortletBody>
        )}
      </Portlet>
    </div>
  );
}

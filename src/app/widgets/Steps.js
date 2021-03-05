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
  const [stepsData,setStepsData]=useState(null);
  const parsed = queryString.parse(props.location.search);
  console.log("parsedsteps", parsed);


  React.useEffect(() => {
    redaxios
      .get("http://localhost:8080/EuclideV2/api/getWizard", {
        params: {
          wizardId: parsed.pagelistid,
          fluxId: parsed.fluxId,
        },
        withCredentials: true,
      })
      .then((res) => setData(res.data));
  }, []);

  const { Step } = Steps;
  React.useEffect(()=>{
    if (data === null) return;
 const steps = data.steps.map((step) => ({
    title: step.title,
    comp: (
      <NewRequest
        setCurrent={setCurrent}
        current={current}
        key={step.id}
        step={step}
        stepsLength={data.steps.length + 1}
      />
    ),
  }));
  setStepsData(steps);
  },[data])
 console.log("stepsData",stepsData)

  React.useEffect(() => {
    console.log("dataofSteps", data);
  },[data]);

  return (
    <div>
      {/* add step save (send a request with save API)  */}
      <Portlet>
        <PortletBody heightfluid={true}>
          <Steps style={{ margin: 5 }} current={current}>
            {stepsData!==null && stepsData.map((item) => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
            <Step title="confirmation" />
          </Steps>
          {stepsData!==null && stepsData[current].comp}
        </PortletBody>
      </Portlet>
    </div>
  );
}

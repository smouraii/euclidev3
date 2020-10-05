import React from "react";
import Api from "../pages/home/data/Api.json";
import { Steps } from "antd";
import NewRequest from "../pages/home/NewRequest";
import { Portlet, PortletBody } from "../partials/content/Portlet";

export default function StepsNewRequest() {
  const [current, setCurrent] = React.useState(0);

  // This is for remote API
  // const { data, error } = useSWR(
  //   "API URL HERE",
  //   fetcher
  // );
  // React.useEffect(() => {
  //   console.log("data", data);
  //   console.log("error", error);
  // }, [data, error]);

  const steps = Api.steps.map((step) => ({
    title: step.title,
    comp: (
      <NewRequest
        setCurrent={setCurrent}
        current={current}
        key={step.id}
        step={step}
        stepsLength={Api.steps.length}
      />
    )
  }));

  return (
    <div>
                <Portlet>
            <PortletBody heightfluid={true}>
      <Steps style={{margin:5}} current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {steps[current].comp}
      </PortletBody>
      </Portlet>
    </div>
  );
}

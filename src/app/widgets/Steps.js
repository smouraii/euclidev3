import React from "react";
import Api from "../pages/home/data/Api.json";
import { Steps } from "antd";
import NewRequest from "../pages/home/NewRequest";

export default function StepsNewRequest() {
  const [current, setCurrent] = React.useState(0);

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
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {steps[current].comp}
    </div>
  );
}

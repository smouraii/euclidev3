import React, { useState } from "react";
import Api from "../pages/home/data/Api.json";
import { Button, Steps, Table } from "antd";
import NewRequest from "../pages/home/NewRequest";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import queryString from "query-string";
import redaxios from "redaxios";
import { Form, Formik } from "formik";
import Axios from "axios";

export default function StepsNewRequest(props) {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [wizardData, setWizardData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [templateData, setTemplateData] = useState(null);
  const parsed = queryString.parse(props.location.search);
  console.log("parsedsteps", parsed);
  console.log("Location:", props.location.search);
  console.log("wizardDataStep:", wizardData);

  const Confirmation = () => {
    React.useEffect(() => {
      const mapColumns = wizardData.map((column) => ({
        title: column.title,
        dataIndex: column.data,
        key: column.name,
      }));
      setColumns(mapColumns);
    }, []);
    return (
      <Form>
        <Table
          rowKey={(row, index) => "" + index}
          pagination={false}
          rowSelection={{
            columnWidth: 100,
          }}
          columns={columns}
        />
        <Button type="primary" onClick={() => prev()}>
          Previous
        </Button>
        <Button type="submit" style={{ float: "left" }}>
          Submit
        </Button>
      </Form>
    );
  };

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

  React.useEffect(() => {
    console.log("dataofSteps", data);
  }, [data]);
  console.log(data);
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
                stepsLength={data.steps.length}
                templateData={templateData}
                setTemplateData={setTemplateData}
                
              />
            )}

            {current >= data.steps.length && wizardData && Confirmation()}
          </PortletBody>
        )}
      </Portlet>
    </div>
  );
}

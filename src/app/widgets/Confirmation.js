import React, { useState } from "react";
import { Button, Table, Descriptions } from "antd";
import { Form } from "formik";

export default function Confirmation(props) {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState(null);

  console.log("ConfirmationWizardData", props.wizardData[props.step.id]);
  console.log("ConfirmationTemplate", props.templateData);
  console.log("ConfirmationStep", props.step.id);

  //mao into the props of wizard first then get the data from wizardData
  //test if array lenght is 0 verify if

  React.useEffect(() => {
    if (props.step.dataset === null) return;
    const mapColumns = props.step.fields.map((field, index) => ({
      key: field.sdccolumnid,
      title: field.columntitle || field.sdccolumnid,
      dataIndex: field.sdccolumnid,
    }));
    setColumns(mapColumns);
    console.log(mapColumns);
    console.log("columns", columns);
  }, [props.wizardData]);

  React.useEffect(() => {
    if (
      props.step.dataset === null ||
      !props.wizardData[props.step.id] ||
      !props.wizardData[props.step.id][props.step.id]
    )
      return;
    const mapData = props.step.fields.reduce(
      (accum,field,index) => ({
        ...accum,
      [field.sdccolumnid]:
        props.wizardData[props.step.id][props.step.id][0]
          [field.sdccolumnid]
        ,
    }),{}
    );
    setDataSource([mapData]);
    console.log("dataSource", mapData);
  }, [props.wizardData,props.step.dataset]);

  return (
    <>
      {props.step.dataset === null && (
        <Descriptions title={props.step.id}>
          {props.step.fields.map((field) => (
            <Descriptions.Item label={field.sdccolumnid}>
              {
                props.wizardData[props.step.id][
                  props.step.id + "_" + field.sdccolumnid
                ]
              }
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}

      {props.step.dataset !== null && (
        <Table
          dataSource={dataSource}
          name={props.step.id}
          title={() => props.step.id}
          rowKey={(row, index) => "" + index}
          pagination={false}
          rowSelection={{
            columnWidth: 100,
          }}
          columns={columns}
        />
      )}
    </>
  );
}

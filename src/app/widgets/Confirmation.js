import React, { useState } from "react";
import { Button, Table } from "antd";
import { Form } from "formik";

export default function Confirmation(props) {
  const [columns, setColumns] = useState([]);
  

  React.useEffect(() => {
    const mapColumns = props.wizardData.map((column) => ({
      [props.templateData[props.step.id][props.sdcid][
        props.data.steps[props.current].fields.sdccolumnid
      ]]:
        column[
          props.templateData[props.step.id][props.sdcid][
            props.data.steps[props.current].fields.sdccolumnid
          ]
        ],
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
      <Button type="primary" onClick={() => props.prev()}>
        Previous
      </Button>
      <Button type="submit" style={{ float: "left" }}>
        Submit
      </Button>
    </Form>
  );
}

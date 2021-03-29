import { Table, AddRowButton, RemoveRowButton, Form, Input } from "formik-antd";
import { Formik } from "formik";
import React, { useState } from "react";
import { Popconfirm } from "antd";
import FInput from "./inputs/FInput";
import FSelect from "./inputs/FSelect";
import FDate from "./inputs/FDate";
import FNumeric from "./inputs/FNumeric";
import "../../component.css";

export default function DatatableWizard(props) {
  const [columns, setColumns] = useState([]);
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const renderswitch = (field) => {
    switch (field.columntype) {
      case "input":
        return (
          <FInput
            // onPressEnter={save}
            // onBlur={save}
            key={field.sdccolumnid}
            name={field.sdccolumnid}
            label={field.columntitle || field.sdccolumnid}
            readonly={field.readonly}
            hidden={field.hidden}
            instructionalText={field.columnInstructionalText}
          />
        );
      case "select":
        return (
          <FSelect
            name={field.sdccolumnid}
            readonly={field.readonly}
            hidden={field.hidden}
            instructionalText={field.columnInstructionalText}
            display={field.selectproperties.display}
            step={props.step}
            refsdcid={field.selectproperties.refsdcid}
          />
        );
      case "auto":
        return (
          <props.FAuto
            name={field.sdccolumnid}
            key={field.sdccolumnid}
            readonly={field.readonly}
            hidden={field.hidden}
            instructionalText={field.columnInstructionalText}
            dependsOnField={field.autoproperties.dependsOnField}
            fromSDC={field.autoproperties.fromSDC}
            fieldId={field.autoproperties.fieldId}
            type={field.autoproperties.type}
            autoproperties={field.autoproperties}
            refsdcid={field.autoproperties.refsdcid}
            displayValueColumnid={
              field.autoproperties.criteriaColumns[0].displayValueColumnid
            }
          />
        );
      case "date":
        return (
          <FDate
            name={field.sdccolumnid}
            key={field.sdccolumnid}
            readonly={field.readonly}
            hidden={field.hidden}
          />
        );
      case "numeric":
        return (
          <FNumeric
            key={field.sdccolumnid}
            name={field.sdccolumnid}
            readonly={field.readonly}
            hidden={field.hidden}
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (!props.columns) return;
    const mapColumns = props.columns.map((field, index) => ({
      key: field.sdccolumnid,
      title: field.columntitle || field.sdccolumnid,
      dataIndex: field.sdccolumnid,
      render: (text, record) => renderswitch(field),
    }));
    mapColumns.push({
      title: "operation",
      dataIndex: "operation",
      key: "actions",
      align: "right",
      render: (record, index) => (
        <RemoveRowButton
          style={{ border: "none" }}
          icon="delete"
          name="tableData"
          index={index}
        />
      ),
    });
    setColumns(mapColumns);
    console.log("mapColumns:", mapColumns);
  }, []);
  return (
    <Formik
      initialValues={{
        tableData: [],
      }}
      onSubmit={() => {}}
    >
      <Form>
        <AddRowButton
          name="tableData"
          style={{ marginBottom: 20 }}
          createNewRow={() => ({})}
        >
          Add
        </AddRowButton>
        <Table
          name="tableData"
          rowKey={(row, index) => "" + index}
          pagination={false}
          columns={columns}
        />
      </Form>
    </Formik>
  );
}

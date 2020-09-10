import React from "react";
import { Field, ErrorMessage } from "formik";
import { Select } from "antd";

export default function FSelect(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Field
        component={Select}
        name={props.name}
        placeholder={props.label}
        disabled={props.readonly}
        hidden={props.hidden}
        style={{ width: "100%" }}
      >
        {/* {props.data.map((elem) => (
          <Select.Option key={elem.id} value={elem.name}>
            {elem.name}
          </Select.Option>
        ))} */}
      </Field>
      <p style={{ margin: 0 }}>{props.instructionalText}</p>
      <ErrorMessage
        name={props.name}
        render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
      />
    </>
  );
}

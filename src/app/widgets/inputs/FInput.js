import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "antd";

export default function FInput(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Field
        as={Input}
        name={props.name}
        placeholder={props.label}
        disabled={props.readonly}
        hidden={props.hidden}
      ></Field>
      <p style={{ margin: 0 }}>{props.instructionalText}</p>
      <ErrorMessage
        name={props.name}
        render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
      />
    </>
  );
}

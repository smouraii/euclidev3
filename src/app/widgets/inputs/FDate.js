import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "antd";
import { DatePicker } from "antd";

export default function FDate(props) {
  return (
    <div>
      <p htmlFor={props.name} style={{ margin: 0 }}>
        {props.label}
      </p>
      <Field
        style={{ width: "100%" }}
        component={DatePicker}
        name={props.name}
        placeholder={props.label}
        disabled={props.readonly}
        hidden={props.hidden}
        onChange={(val) => console.log(val)}
      ></Field>
      <p style={{ margin: 0 }}>{props.instructionaltext}</p>
      <ErrorMessage
        name={props.name}
        render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
      />
    </div>
  );
}

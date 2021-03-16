import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Select, Input, DatePicker } from "antd";
import redaxios from "redaxios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

function FAuto(props) {
  const [data, setData] = useState([]);

  const renderFields = () => {
    switch (props.type) {
      case "C":
      case null:
        return (
          <Field
            key={props.key}
            as={Input}
            name={props.name}
            label={props.label}
            readonly={props.readonly}
            hidden={props.hidden}
            instructionalText={props.instructionalText}
            defaultvalue={props.autoproperties.defaultvalue}
          />
        );
      case "F":
      case "V":
      case "R":
        return (
          <Field
            component={Select}
            key={props.key}
            name={props.name}
            label={props.label}
            readonly={props.readonly}
            hidden={props.hidden}
            instructionalText={props.instructionalText}
            display={props.autoproperties.refvaluedesc}
            defaultvalue={props.autoproperties.defaultvalue}
          />
        );
      case "D":
        return (
          <Field
            component={DatePicker}
            key={props.key}
            name={props.name}
            label={props.label}
            readonly={props.readonly}
            hidden={props.hidden}
            instructionalText={props.instructionalText}
            defaultvalue={props.autoproperties.defaultvalue}
          />
        );
      case "N":
        return (
          <Field
            as={Input}
            key={props.key}
            name={props.name}
            label={props.label}
            readonly={props.readonly}
            hidden={props.hidden}
            instructionalText={props.instructionalText}
            defaultvalue={props.autoproperties.defaultvalue}
          />
        );
      default:
        return "null";
    }
  };

  return (
    <>
      {data && (
        <div>
          <label htmlFor={props.name}>{props.label}</label>

          {renderFields()}
          <p style={{ margin: 0 }}>{props.instructionalText}</p>
          <ErrorMessage
            name={props.name}
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
      )}
    </>
  );
}
export default withRouter(FAuto);

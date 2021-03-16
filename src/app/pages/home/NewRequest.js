import React, { useEffect, useState } from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  ErrorMessage,
} from "formik";
import FInput from "../../widgets/inputs/FInput";
import FSelect from "../../widgets/inputs/FSelect";
import FDate from "../../widgets/inputs/FDate";
import FNumeric from "../../widgets/inputs/FNumeric";
import * as Yup from "yup";
import { Button, Select, Input, DatePicker } from "antd";
import useSWR from "swr";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import redaxios from "redaxios";
import TransferSample from "../../widgets/TransferSample";
import DatatableRequest from "../../widgets/DatatableRequest";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import moment from "moment";

function NewRequest(props) {
  const [fieldsNamesObject, setFieldsNameObject] = useState(null);
  const [validationObject, setValidationObject] = useState(null);
  const [data, setData] = useState([]);
  const fieldsNames = props.step.fields.map((field) => field.sdccolumnid);

  console.log("propsNeWRequest", props);

  React.useEffect(() => {
    console.log("props", props);
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
  }, []);

  const FAuto = (props) => {
    const { values, touched, setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    console.log("MYFIELDprops", props);
    const dateFormat = "YYYY-MM-DD hh:mm:ss.S";
    if (props.type === "D") {
      console.log("ValuePropsName:", values[props.name], props.name);
      console.log(
        "Datepicker:",
        values[props.name] !== null
          ? moment(values[props.name], dateFormat)
          : null
      );
    }
    const renderAutoFields = () => {
      switch (props.type) {
        case "C":
        case null:
          return (
            <Field
              {...props}
              {...field}
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
              {...props}
              {...field}
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
        //formatDate(inputValue, props.format)
        case "D":
          return (
            <Field
              {...props}
              {...field}
              component={DatePicker}
              key={props.key}
              name={props.name}
              label={props.label}
              readonly={props.readonly}
              hidden={props.hidden}
              instructionalText={props.instructionalText}
              showTime
              value={
                values[props.name] !== "" && values[props.name] !== null
                  ? moment(values[props.name], dateFormat)
                  : null
              }
              format={dateFormat}
            />
          );
        case "N":
          return (
            <Field
              {...props}
              {...field}
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
    React.useEffect(() => {
      // set the value of textC, based on textA and textB
      if (values[props.dependsOnField].trim() !== "") {
        console.log("dependonF", values[props.dependsOnField]);
        redaxios
          .get(
            `http://localhost:8080/EuclideV2/api/getDependFields?sdcId=${
              props.fromSDC
            }&displayValueColumnid=${props.displayValueColumnid}&fieldValue=${
              values[props.dependsOnField]
            }&type=${props.type}`,
            { withCredentials: true }
          )
          .then((res) =>
            props.type === "C" || props.type === "N" || props.type === "D"
              ? setFieldValue(props.name, res.data)
              : props.type === "R" || props.type === "V" || props.type === "F"
              ? setFieldValue(props.name, res.data.id)
              : "error"
          );
      }
    }, [values[props.dependsOnField]]);

    // style display none if props.hidden true
    return (
      <>
        <div >
          <label htmlFor={props.name} >{props.label}</label>

          {renderAutoFields()}
          <p style={{ margin: 0 }}>{props.instructionalText}</p>
          <ErrorMessage
            name={props.name}
            render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
          />
        </div>
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
  };

  const renderFields = () => {
    return props.step.fields.map((field) => {
      switch (field.columntype) {
        case "input":
          return (
            <FInput
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
              label={field.columntitle || field.sdccolumnid}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
              display={field.selectproperties.display}
              step={props.step.id}
              refsdcid={field.selectproperties.refsdcid}
            />
          );
        case "auto":
          return (
            <FAuto
              key={field.sdccolumnid}
              name={field.sdccolumnid}
              label={field.columntitle || field.sdccolumnid}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
              dependsOnField={field.autoproperties.dependsOnField}
              fromSDC={field.autoproperties.fromSDC}
              fieldId={field.autoproperties.fieldId}
              type={field.autoproperties.type}
              autoproperties={field.autoproperties}
              displayValueColumnid={
                field.autoproperties.criteriaColumns[0].displayValueColumnid
              }
            />
          );
        case "date":
          return (
            <FDate
              key={field.sdccolumnid}
              name={field.sdccolumnid}
              label={field.columntitle || field.sdccolumnid}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
            />
          );
        case "numeric":
          return (
            <FNumeric
              key={field.sdccolumnid}
              name={field.sdccolumnid}
              label={field.columntitle || field.sdccolumnid}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
            />
          );
        default:
          return null;
      }
    });
  };

  // input, select, auto, numeric, date

  React.useEffect(() => {
    const objToFill = {};
    fieldsNames.forEach((fieldName) => (objToFill[fieldName] = ""));
    setFieldsNameObject(objToFill);

    const validationObj = {};

    props.step.fields
      .map((field) => {
        switch (field.columntype) {
          case "input":
            // case "auto":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.string().required("Mandatory Field")
                : Yup.string(),
            };
          case "numeric":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.number("Must be a number")
                    .required("Mandatory Field")
                    .typeError("Must be a number")
                : Yup.number("Must be a number").typeError("Must be a number"),
            };

          case "date":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.date("Must be a date").required("Mandatory Field")
                : Yup.date("Must be a date"),
            };
          case "select":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.string("Must choose a value").required("Mandatory Field")
                : Yup.string("Must choose a value"),
            };

          default:
            return null;
        }
      })
      .forEach((elem) => {
        if (elem) {
          validationObj[elem.name] = elem.validation;
        }
      });

    setValidationObject(validationObj);
  }, []);

  return (
    <>
      {props.hidden ||
        (fieldsNamesObject && (
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="row d-flex justify-content-center">
                <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                  <Formik
                    initialValues={fieldsNamesObject}
                    validationSchema={Yup.object(validationObject)}
                    onSubmit={(val) => {
                      console.log("submitting.......");
                      console.log(val);
                      props.setCurrent(props.current + 1);
                    }}
                  >
                    {(formikProps) => (
                      <Form>
                        {renderFields(formikProps)}
                        {props.current > 0 && props.current < 2 && (
                          <>
                            <Portlet
                              className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                              fluidHeight={true}
                            >
                              <PortletBody>
                                <div className="row d-flex justify content-center">
                                  <div className="col-md-6">
                                    <TransferSample />
                                  </div>
                                  <div className="col-md-12">
                                    <DatatableRequest
                                      columns={props.step.fields}
                                    />
                                  </div>
                                </div>
                              </PortletBody>
                            </Portlet>
                          </>
                        )}
                        {props.current > 0 && (
                          <Button
                            type="secondary"
                            onClick={() => props.setCurrent(props.current - 1)}
                          >
                            Prev
                          </Button>
                        )}
                        <Button htmlType="submit" type="primary">
                          Next
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Portlet>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
export default withRouter(NewRequest);

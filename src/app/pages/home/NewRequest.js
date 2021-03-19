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
import DatatableWizard from "../../widgets/DatatableWizard";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import moment from "moment";
import EditableTable from "../../widgets/DatatableRequest";

function NewRequest(props) {
  const [fieldsNamesObject, setFieldsNameObject] = useState(null);
  const [validationObject, setValidationObject] = useState(null);
  const [current,setCurrent]=useState(props.current);

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
    const [selectData, setSelectData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
    const [page, setPage] = useState(0);

    React.useEffect(() => {
      if (props.refsdcid === null) return;
      redaxios
        .get("http://localhost:8080/EuclideV2/api/getSelectOptions", {
          params: {
            dc: `com.euclide.sdc.${props.refsdcid}`,
            displayValueColumnid: props.displayValueColumnid,
            page: page,
          },
          withCredentials: true,
        })
        .then((response) => {
          setSelectData(response.data.results);
          setHasMore(response.data.more);
        });
      console.log("selectData", selectData);
    }, [props, page]);
    console.log("selectData", selectData);
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
              readOnly={props.readonly}
              hidden={props.hidden}
              instructionalText={props.instructionalText}
              defaultValue={props.autoproperties.defaultvalue}
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
              readOnly={props.readonly}
              hidden={props.hidden}
              instructionalText={props.instructionalText}
              display={props.autoproperties.refvaluedesc}
              defaultValue={props.autoproperties.defaultvalue}
              onPopupScroll={() => {
                console.log("window.innerHeight: ", window.innerHeight);
                console.log(
                  "document.documentElement.scrollTop: ",
                  document.documentElement.scrollTop
                );
                console.log(
                  "document.scrollingElement.scrollHeight: ",
                  window.innerHeight
                );
                console.log("hihihi:", page);
                if (
                  hasMore !== false &&
                  window.innerHeight + document.documentElement.scrollTop ===
                    document.scrollingElement.scrollHeight
                ) {
                  setScrollPosition(window.pageYOffset);
                  setPage(page + 1);
                }
              }}
            >
              {selectData.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  <div className="demo-infinite-container">{elem.name}</div>
                </Select.Option>
              ))}
            </Field>
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
              readOnly={props.readonly}
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
              readOnly={props.readonly}
              hidden={props.hidden}
              instructionalText={props.instructionalText}
              defaultValue={props.autoproperties.defaultvalue}
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
          .get("http://localhost:8080/EuclideV2/api/getDependFields", {
            params: {
              sdcId: props.fromSDC,
              displayValueColumnid: props.displayValueColumnid,
              fieldValue: values[props.dependsOnField],
              type: props.type,
            },
            withCredentials: true,
          })
          .then((res) =>
            props.type === "C" || props.type === "N" || props.type === "D"
              ? setFieldValue(props.name, res.data)
              : props.type === "R" || props.type === "V" || props.type === "F"
              ? setFieldValue(props.name, res.data.id)
              : null
          );
      }
    }, [values[props.dependsOnField]]);

    // style display none if props.hidden true
    return (
      <>
        <div>
          <label htmlFor={props.name}>{props.label}</label>
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
              refsdcid={field.autoproperties.refsdcid}
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
React.useEffect(()=>{
  console.log("current",current)
}, [current]);
  

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
                      setCurrent(current + 1);
                    }}
                  >
                    {(formikProps) => (
                      <Form>
                        {renderFields(formikProps)}
                        
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
                                    <EditableTable
                                      columns={props.step.fields}
                                    />
                                  </div>
                                </div>
                              </PortletBody>
                            </Portlet>
                          </>
                        
                        {props.current > 0 && (
                          <Button
                            type="secondary"
                            style={{float:"right"}}
                            onClick={() => setCurrent(current - 1)}
                          >
                            Prev
                          </Button>
                        )}
                        <Button type="primary" onClick={() => setCurrent(current + 1)}>
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

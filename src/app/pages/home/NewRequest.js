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
import { Button, Select, Input, DatePicker, Typography } from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import redaxios from "redaxios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import moment from "moment";
import DatatableWizard from "../../widgets/DatatableWizard";
import axios from "axios";

function NewRequest(props) {
  const [fieldsNamesObject, setFieldsNameObject] = useState(null);
  const [validationObject, setValidationObject] = useState(null);
  const [data, setData] = useState(null);
  const [mappedTemplate, setMappedTemplate] = useState([]);


  console.log("propsNeWRequest", props);

  React.useEffect(() => {
    if (!props.wizardid && !props.fluxId && !props.sdcid) return;
    axios
      .get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getTemplates`, {
        params: {
          wizardId: props.wizardid,
          fluxId: props.fluxId,
          sdcid: props.sdcid,
        },
        withCredentials: true,
      })
      .then((res) => setData(res.data));
    console.log("Data:", data);
  }, []);


  const Template = (formikProps) => {
    const [selectedTemplate, setSelectedTemplate] = useState([]);
    const { setFieldValue } = useFormikContext();

    const handleChange = (selectedTemplate) => {
      setSelectedTemplate(selectedTemplate);
    };
    console.log("SelectedTemplate:", selectedTemplate);
    console.log("templateData", props.templateData);

    return (
      <>
        {data !== null && (
          <div className="inputContainer">
            <label htmlFor="template">Template</label>
            <Field
              showSearch
              component={Select}
              onChange={handleChange}
              onSelect={(val) => {
                setFieldValue(data.value, val);
                if (!props.wizardid && !props.fluxId && data !== null) return;
                axios
                  .get(
                    `${process.env.REACT_APP_HOST}/EuclideV2/api/flux/wizard/${props.fluxId}/${props.wizardid}/${selectedTemplate}`,
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => props.setTemplateData([res.data]));
              }}
              name={data.value}
              value={selectedTemplate}
              placeholder="Select a template"
              style={{ width: "100%" }}
            >
              {data.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  <div className="demo-infinite-container">{elem.value}</div>
                </Select.Option>
              ))}
            </Field>
          </div>
        )}
      </>
    );
  };

  const FAuto = (props) => {
    const { values, touched, setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const [selectData, setSelectData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
    const [page, setPage] = useState(0);

    console.log("FAUTOprops:", props);

    React.useEffect(() => {
      if (!props.refsdcid) return;
      redaxios
        .get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getSelectOptions`, {
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
              disabled={props.readonly}
              hidden={props.hidden}
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
                console.log("PageNumber:", page);
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
              placeholder="please add date"
              key={props.key}
              name={props.name}
              label={props.label}
              disabled={props.readonly}
              hidden={props.hidden}
              showTime
              value={
                values[props.name] !== "" && values[props.name] !== null
                  ? moment(values[props.name], dateFormat)
                  : null
              }
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
              disabled={props.readonly}
              hidden={props.hidden}
              defaultValue={props.autoproperties.defaultvalue}
            />
          );
        default:
          return "null";
      }
    };
    React.useEffect(() => {
      // set the value of textB, based on textA
      if (
        values[props.dependsOnField] &&
        values[props.dependsOnField].trim() !== ""
      ) {
        console.log("dependonField:", values[props.dependsOnField]);
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
          <p style={{ margin: 0 }}>{props.instructionaltext}</p>
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
    return (
      <>
        <Template
          fluxId={props.fluxId}
          wizardid={props.wizardid}
          sdcid={props.sdcid}
        />
        {props.step.fields.map((field) => {
          switch (field.columntype) {
            case "input":
              return (
                <FInput
                  key={props.step.id + "_" + field.sdccolumnid}
                  name={props.step.id + "_" + field.sdccolumnid}
                  label={field.columntitle || field.sdccolumnid}
                  readonly={field.readonly}
                  hidden={field.hidden}
                  instructionaltext={field.columnInstructionalText}
                />
              );
            case "select":
              return (
                <FSelect
                  key={props.step.id + "_" + field.sdccolumnid}
                  name={props.step.id + "_" + field.sdccolumnid}
                  label={field.columntitle || field.sdccolumnid}
                  readonly={field.readonly}
                  hidden={field.hidden}
                  instructionaltext={field.columnInstructionalText}
                  display={field.selectproperties.display}
                  step={props.step.id}
                  refsdcid={field.selectproperties.refsdcid}
                />
              );
            case "auto":
              return (
                <FAuto
                  key={props.step.id + "_" + field.sdccolumnid}
                  name={props.step.id + "_" + field.sdccolumnid}
                  label={field.columntitle || field.sdccolumnid}
                  readonly={field.readonly}
                  hidden={field.hidden}
                  instructionaltext={field.columnInstructionalText}
                  dependsOnField={
                    props.step.id + "_" + field.autoproperties.dependsOnField
                  }
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
                  key={props.step.id + "_" + field.sdccolumnid}
                  name={props.step.id + "_" + field.sdccolumnid}
                  label={field.columntitle || field.sdccolumnid}
                  readonly={field.readonly}
                  hidden={field.hidden}
                  instructionaltext={field.columnInstructionalText}
                />
              );
            case "numeric":
              return (
                <FNumeric
                  key={props.step.id + "_" + field.sdccolumnid}
                  name={props.step.id + "_" + field.sdccolumnid}
                  label={field.columntitle || field.sdccolumnid}
                  readonly={field.readonly}
                  hidden={field.hidden}
                  instructionaltext={field.columnInstructionalText}
                />
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  // input, select, auto, numeric, date

  //validation
  React.useEffect(() => {
    const objToFill = {};
    props.step.fields
      .map((field) => props.step.dataset ? props.step.id + "_" + field.sdccolumnid+"_"+0 : props.step.id+ "_"+field.sdccolumnid )
      .forEach((fieldName) => (objToFill[fieldName] = "mappedTemplate"));
    setFieldsNameObject(objToFill);
    console.log("PropsTemplateData:",props.templateData)
  }, [props.templateData]);


  React.useEffect(() => {
  const validationObj = {};

  props.step.fields
    .map((field) => {
      switch (field.columntype) {
        case "input":
          // case "auto":
          return {
            name: props.step.id + "_" + field.sdccolumnid,
            validation: field.mandatory
              ? Yup.string().required("Mandatory Field")
              : Yup.string(),
          };
        case "numeric":
          return {
            name: props.step.id + "_" + field.sdccolumnid,
            validation: field.mandatory
              ? Yup.number("Must be a number")
                  .required("Mandatory Field")
                  .typeError("Must be a number")
              : Yup.number("Must be a number").typeError("Must be a number"),
          };

        case "date":
          return {
            name: props.step.id + "_" + field.sdccolumnid,
            validation: field.mandatory
              ? Yup.date("Must be a date").required("Mandatory Field")
              : Yup.date("Must be a date"),
          };
        case "select":
          return {
            name: props.step.id + "_" + field.sdccolumnid,
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

  React.useEffect(() => {
    console.log("wizardData", props.wizardData);
  }, [props.wizardData]);

  return (
    <>
      {props.hidden ||
        (fieldsNamesObject && (
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row d-flex justify-content-center">
                <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
                  <Formik
                    enableReinitialize={true}
                    initialValues={fieldsNamesObject}
                    validationSchema={Yup.object(validationObject)}
                    onSubmit={(val) => {
                      console.log("submitting.......");
                      console.log("val:", val);
                      props.setWizardData([{ ...props.wizardData, ...val }]);
                      props.next();
                    }}
                  >
                    {(formikProps) => (
                      <Form>
                        {props.step.dataset === null &&
                          renderFields(formikProps)}
                        <>
                          {props.step.dataset !== null && (
                            <Portlet
                              className="kt-portlet--height-fluid kt-portlet--border-bottom-brand"
                              fluidHeight={true}
                            >
                              <PortletBody>
                                <div className="row d-flex justify content-center">
                                  <div className="col-md-12">
                                    <DatatableWizard
                                      columns={props.step.fields}
                                      step={props.step.id}
                                      dataset={props.step.dataset}
                                      FAuto={FAuto}
                                    />
                                  </div>
                                </div>
                              </PortletBody>
                            </Portlet>
                          )}
                        </>
                        {props.current > 0 && (
                          <Button
                            type="primary"
                            style={{ float: "left" }}
                            onClick={() => props.prev()}
                          >
                            Prev
                          </Button>
                        )}
                        {props.current < props.stepsLength && (
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ float: "right" }}
                          >
                            Next
                          </Button>
                        )}
                        <Button
                          type="primary"
                          style={{ float: "right" }}
                          onClick={() =>
                            axios.post(
                              process.env.REACT_APP_HOST +
                                "/EuclideV2/Savelink",
                              { param1: "param1", param2: "param2" }
                            )
                          }
                        >
                          Save
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

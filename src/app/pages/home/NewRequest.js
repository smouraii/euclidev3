import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import FInput from "../../widgets/inputs/FInput";
import FSelect from "../../widgets/inputs/FSelect";
import FDate from "../../widgets/inputs/FDate";
import FNumeric from "../../widgets/inputs/FNumeric";
import FAuto from "../../widgets/inputs/FAuto";
import * as Yup from "yup";
import { Button } from "antd";
import useSWR from "swr";
import Api from "../home/data/Api.json";

export default function NewRequest(props) {

  let emptyArr = [];
  function Profile(display) {
     const { selectValues, error } = useSWR(
      `http://localhost:8088/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.RequestStatus&display=${display}`
    );
    if (error) return <div>failed to load</div>;
    if (!selectValues) return <div>loading...</div>;
    selectValues.map(el => emptyArr.push(el.name)) 
    
   
  }
  Api.steps.fields.map((api) => (
      Profile(api.selectproperties.display)
  ))


  const [fieldsNamesObject, setFieldsNameObject] = React.useState(null);
  const [validationObject, setValidationObject] = React.useState(null);
  const fieldsNames = props.step.fields.map((field) => field.sdccolumnid);

  const renderFields = (formik) => {
    return props.step.fields.map((field) => {
      switch (field.columntype) {
        case "input":
          return (
            <FInput
              key={field.sdccolumnid}
              name={field.sdccolumnid}
              label={field.columntitle}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
            />
          );
        case "select":
          return (
            <FSelect
              name={field.sdccolumnid}
              label={field.columntitle}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
              data={emptyArr}
            />
          );
        case "date":
          return (
            <FDate
              key={field.sdccolumnid}
              name={field.sdccolumnid}
              label={field.columntitle}
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
              label={field.columntitle}
              readonly={field.readonly}
              hidden={field.hidden}
              instructionalText={field.columnInstructionalText}
              formik={formik}
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
                : Yup.string()
            };
          case "numeric":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.number("Must be a number")
                    .required("Mandatory Field")
                    .typeError("Must be a number")
                : Yup.number("Must be a number").typeError("Must be a number")
            };

          case "date":
            return {
              name: field.sdccolumnid,
              validation: field.mandatory
                ? Yup.date("Must be a date").required("Mandatory Field")
                : Yup.date("Must be a date")
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
          <div>
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
          </div>
        ))}
    </>
  );
}

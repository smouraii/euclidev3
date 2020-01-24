import React from "react";
import StepsComp from "../../widgets/Steps";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Formik, Form, useField, FieldAttributes, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import * as yup from "yup";

export default function NewRequest() {
  return (
    <>
      <StepsComp
        firstcontent={<div></div>}
        secondcontent={<div></div>}
        thirdcontent={<div></div>}
      />
    </>
  );
}
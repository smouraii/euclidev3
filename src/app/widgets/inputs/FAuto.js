import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Select } from "antd";
import axios from "axios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

 function FAuto(props) {
  const [data,setData]=useState([]);

  React.useEffect(() => {
    console.log("props", props);
    const parsed = queryString.parse(props.location.search);
    console.log(parsed);
    axios
      // .get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.${parsed.pagelistid}&display=${props.steps.fields.selectproperties.display}`)
    .get("https://run.mocky.io/v3/49335da3-1de5-40b9-83f5-464140dff9be")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      {data && (
        <div>
          <label htmlFor={props.name}>{props.label}</label>
          <Field
            component={Select}
            name={props.name}
            placeholder={props.label}
            disabled={props.readonly}
            hidden={props.hidden}
            style={{ width: "100%" }}
          >
            {data.map((elem) => (
              <Select.Option key={elem.id} value={elem.name}>
                {elem.name}
              </Select.Option>
            ))}
          </Field>
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

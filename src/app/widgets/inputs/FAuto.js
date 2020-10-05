import React from "react";
import { Field, ErrorMessage } from "formik";
import { Select } from "antd";
import useSWR from "swr";

export default function FAuto(props) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    "https://run.mocky.io/v3/49335da3-1de5-40b9-83f5-464140dff9be",
    fetcher
    // `http://localhost:8088/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.RequestStatus&display=${props.display}`
  );
  React.useEffect(() => {
    // console.log("props", props);
    // redaxios
    //   .get(
    //     `http://localhost:8088/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.RequestStatus&display=${display}`
    //   )
    //   .then((res) => setData(res.data));

    console.log("data", data);
    console.log("error", error);
  }, [data, error]);

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
                {/* maybe n7tto hna */}
                {/* maybe n7tto hna */}
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

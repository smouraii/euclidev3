import React from "react";
import { Field, ErrorMessage } from "formik";
import { Select } from "antd";
import redaxios from "redaxios";
import useSWR from "swr";

export default function FSelect(props) {
  const { data } = useSWR(
    `http://localhost:8088/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.RequestStatus&display=${props.display}`
  );

  // React.useEffect(() => {
  //   console.log("props", props);
  //   redaxios
  //     .get(
  //       `http://localhost:8088/EuclideV2/api/getSelectOptions?dc=com.euclide.sdc.RequestStatus&display=${display}`
  //     )
  //     .then((res) => setData(res.data));
  // }, []);

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

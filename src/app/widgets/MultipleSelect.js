import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Axios from "axios";
import { useFormikContext, Field } from "formik";

export default function MultipleSelect(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);

  const { values } = useFormikContext();

  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    console.log("selectedItemsMultiSelect", selectedItems);
  };

  useEffect(() => {
    if (props.dataset === null && props.sdcid === null) return;
    Axios.get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getDataSet`, {
      params: {
        sdcid: props.sdcid,
      },
    }).then((res) => setData(res.data));
  }, []);

  // const filteredOptions = data.filter((o) => !selectedItems.includes(o.name));
  return (
    <Field
      component={Select}
      mode="multiple"
      placeholder="Choose a Dataset"
      name={props.name}
      value={
        values[props.step][props.valueIndex][props.dataset.sdcid] &&
        values[props.step][props.valueIndex][props.dataset.sdcid] !== []
          ? values[props.step][props.valueIndex][props.dataset.sdcid].map(
              (elem, index) => elem.datasetName
            )
          : selectedItems
      }
      onChange={handleChange}
      style={{ width: "100%" }}
    >
      {data.map((item) => (
        <Select.Option key={item.id} value={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Field>
  );
}

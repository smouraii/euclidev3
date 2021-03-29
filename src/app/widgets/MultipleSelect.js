import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Axios from "axios";

export default function MultipleSelect(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);

  const OPTIONS = [{name:"Apples"},{name: "Nails"},{name: "Bananas"}, {name:"Helicopters"}];


  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
      if(props.dataset===null) return;
    Axios.get(`${process.env.REACT_APP_HOST}/EuclideV2/api/getDataSet`, {
      params: {
        sdcid: props.dataset.sdcid,
      },
    }).then((res) => setData(res.data));
  }, []);

  const filteredOptions = data.filter((o) => !selectedItems.includes(o.name));
  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={handleChange}
      style={{ width: "100%" }}
    >
      {filteredOptions.map((item) => (
        <Select.Option key={item.id} value={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

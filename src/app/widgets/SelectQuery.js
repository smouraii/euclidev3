import React, { Component } from "react";
import { Select } from "antd";
import redaxios from "redaxios";

const { Option } = Select;

export default class SelectQuery extends Component {
  state = {
    value: null,
    selectedValuesData: [],
  };

  componentDidMount() {
    redaxios
      .get(
        `http://localhost:8080/EuclideV2/api/getSelectOptions?dc=${this.props.customProps.package}.${this.props.customProps.domain}&display=${this.props.customProps.displayValue}`,
        { withCredentials: true}
      )
      .then((res) => {
        this.setState(
          { selectedValuesData: res.data },
          console.log("SelecOptions", this.state.selectedValuesData)
        );
      });
    console.log("ComponentDidMount");
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const options = this.state.selectedValuesData.map((d) => (
      <Option key={d.id}>{d.name}</Option>
    ));
    return (
      <Select
        placeholder={this.props.placeholder}
        size="small"
        style={{ width: 150 }}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}

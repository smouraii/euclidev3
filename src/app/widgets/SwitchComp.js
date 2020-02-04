import React, { Component } from "react";
import Switch from "react-switch";
 
class SwitchComp extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {
    return (
      <label>
        <h5>Start creating domains</h5>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}
export default SwitchComp;
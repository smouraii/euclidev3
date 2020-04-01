import React, { Component } from "react";
import Switch from "react-switch";
import { Input } from "antd";
 
class SwitchComp extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }

  toggle=()=>{
    this.setState({
      checked:!this.state.checked
    });
  }
 
  render() {
    return (
      <>
        <Switch onChange={this.handleChange} checked={this.state.checked} onClick={this.toggle}/>
        {this.state.checked && <div className="inputContainer">
                        <label htmlFor="nodeId">Node ID</label>
                        <Input
                          placeholder="Node ID "
                          name="nodeId"
                        />
                      </div>}
      </>
    );
  }
}
export default SwitchComp;
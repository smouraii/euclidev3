import React, { Component } from "react";
import Switch from "react-switch";
import { Input } from "antd";
 
class SwitchCompAllocate extends Component {
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
                        <div className="row"><Switch/> </div>
                        <div className="row"><Switch/> </div>
                        <div className="row"><Switch/> </div>
                        <div className="row"><Switch/> </div>
                      </div>}
      </>
    );
  }
}
export default SwitchCompAllocate;
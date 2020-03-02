import React, { Component } from "react";
import Fullscreen from "react-full-screen";
import {Button} from 'antd';
 
class FullscreenButton extends Component {
  constructor(props) {
    super();
 
    this.state = {
      isFull: false,
    };
  }
 
  goFull = () => {
    this.setState({ isFull: true });
  }
 
  render() {
    return (
      <div className="App">
        <Button onClick={this.goFull}>
          Go Fullscreen
        </Button>
 
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        </Fullscreen>
      </div>
    );
  }
}
 
export default FullscreenButton;
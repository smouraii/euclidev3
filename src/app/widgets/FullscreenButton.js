import React, { Component, useState } from "react";
import Fullscreen from "react-full-screen";
import {Button} from 'antd';
import { Portlet } from "../partials/content/Portlet";
 
export default function FullscreenButton(props)  {

 
const [isFull,setIsFull] = useState({isFull:false});
 
const goFull = () => {
    setIsFull({ isFull: true });
  }
 

    return (
      <div className="Fullscreen">
        <Button onClick={goFull}>
          Go Fullscreen
        </Button>
 
        <Fullscreen
          enabled={isFull}
          onChange={isFull => setIsFull({isFull})}
        >
        <Portlet>
        <div style={{margin:50}}>
        {props.current}
        </div>
        </Portlet>
        </Fullscreen>
      </div>
    );
  }

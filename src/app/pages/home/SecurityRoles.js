import React from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import SwitchComp from "../../widgets/SwitchComp";
import InputComp from "../../widgets/InputComp";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

export default function SecurityRoles(){

    return (
      <>
        <InputComp
          title={"Security Roles"}
          content={
            <>

            </>
          }
        />
      </>
    );
  }

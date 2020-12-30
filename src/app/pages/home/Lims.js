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
import redaxios from "redaxios";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class Lims extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  limsSave = (values) => {
  redaxios.post(
    "http://localhost:8080/EuclideV2/saveSysLims",({
      limsDatabase: values.limsDatabase,
      password: values.password,
      restServiceUrl: values.restServiceUrl,
      username: values.username,
      nodeID:"",
    }),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      withCredentials: true,
    }
  )
  .then((res) => console.log("reponse",res))
  .catch((error) => console.log("error", error));
  console.log("test");
};


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.limsSave(values);
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <>
        <InputComp
          title={"Lims"}
          content={
            <>
              <div
                className="row d-flex justify-content-center"
                style={{ marginTop: "50px" }}
              >
                <div className="col-md-6 ">
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Rest Services URL">
                      {getFieldDecorator("restServiceUrl", {
                        rules: [
                          {
                            required: true,
                            message: "Please type a REST Service URL"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Lims Database">
                      {getFieldDecorator("limsDatabase", {
                        rules: [
                          {
                            required: true,
                            message: "Please type a LIMS DATABASE"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Username">
                      {getFieldDecorator("username", {
                        rules: [
                          {
                            required: true,
                            message: "Please type your username!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your password!"
                          }
                        ]
                      })(<Input.Password />)}
                    </Form.Item>
                    
                    <Form.Item label="Start Creating Domain">
                    <SwitchComp />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </>
          }
        />
      </>
    );
  }
}

const WrappedLims = Form.create({ name: "Inputs" })(Lims);

export default WrappedLims;

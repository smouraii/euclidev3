import React from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Divider
} from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import InputComp from "../../widgets/InputComp";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

class MailServer extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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
          title={"MailServer"}
          content={
            <>
              <div
                className="row d-flex justify-content-center"
                style={{ marginTop: "50px" }}
              >
                <div className="col-md-12">
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <div className="row d-flex justify-content-center">
                      <h1>Account Information</h1> 
                    </div>

                    <div className="col-md-6" style={{ float: "left" }}>
                      <Form.Item label="Email Adress or Username">
                        {getFieldDecorator("username", {
                          rules: [
                            {
                              required: true,
                              message: "Type here"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Outgoing Mail Server (SMTP)">
                        {getFieldDecorator("MailServer", {
                          rules: [
                            {
                              required: true,
                              message: "smtp.XXXX.XXXX"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                    </div>
                    <div className="col-md-6" style={{ float: "left" }}>
                      <Form.Item label="Password">
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Please type your password!"
                            }
                          ]
                        })(<Input.Password />)}
                      </Form.Item>
                      <Form.Item label="Port">
                        {getFieldDecorator("Port", {
                          rules: [
                            {
                              required: true,
                              message: "465.993"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                    </div>
                  </Form>
                  <Divider />
                  
                      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <div className="row d-flex justify-content-center">
                          <h1>SMTP properties</h1>
                        </div>
                        <div className="row d-flex justify-content-between">

                        <div className="col-md-6" >
                          <Form.Item label="mail.smtp.auth">
                            {getFieldDecorator("SmtpAuth", {
                              rules: [
                                {
                                  required: true
                                }
                              ]
                            })(
                              <Select
                                defaultValue="No"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                              >
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                              </Select>
                            )}
                          </Form.Item>
                          </div>
                          <div className="col-md-6">
                          <Form.Item label="mail.smtp.socketFactory.port" >
                            {getFieldDecorator("SocketFactortyPort", {
                              rules: [
                                {
                                  required: true,
                                  message: "465.963"
                                }
                              ]
                            })(<Input placeholder="465.963"/>)}
                          </Form.Item>
                          
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-6">
                          <Form.Item label="mail.smtp.socketFactory.fallback">
                            {getFieldDecorator("SocketFactoryFallbackgit ", {
                              rules: [
                                {
                                  required: true
                                }
                              ]
                            })(
                              <Select
                                defaultValue="No"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                              >
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                              </Select>
                            )}
                          </Form.Item>
                          </div>
                          </div>
                       <div className="row d-flex justify-content-between">
                       <div className="col-md-6">
                       <Form.Item label="mail.smtp.starttls.enable">
                            {getFieldDecorator("SmtpEnable", {
                              rules: [
                                {
                                  required: true
                                }
                              ]
                            })(
                              <Select
                                defaultValue="No"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                              >
                                <Option value="Yes">Yes</Option>
                                <Option value="No">No</Option>
                              </Select>
                            )}
                          </Form.Item>
                          </div>
                        <div className="col-md-6" >
                          <Form.Item label="mail.smtp.socketFactory.class">
                            {getFieldDecorator("socketFatoryClass", {
                              rules: [
                                {
                                  required: true,
                                  message: "java.net.ssl.SSLSocketFactory"
                                }
                              ]
                            })(<Input placeholder="java.net.ssl.SSLSocketFactory" />)}
                          </Form.Item>
                          </div>
                          
                        </div>
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

const WrappedMailServer = Form.create({ name: "Inputs" })(MailServer);

export default WrappedMailServer;

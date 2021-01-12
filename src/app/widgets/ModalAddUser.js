import React from "react";
import { Modal, Button, Icon, Select, Typography, message, Tooltip } from "antd";
import FInput from "./inputs/FInput";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from "formik";
import redaxios from "redaxios";
import * as Yup from 'yup';
import qs from "qs";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  surname: Yup.string()
    .required('Required'),
  username: Yup.string()
    .required('Required')
    .test('checkUsernameUnique', 'This username is already registered.', value =>
      redaxios.get(
        process.env.REACT_APP_HOST + "/EuclideV2/api/admin/user/usercheck",
        {
          params: {
            username: value
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      )
      .then(res => {
        return res.data.status == 'OK'
      }),
    ),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
    .test('checkEmailUnique', 'This email is already registered.', value =>
      redaxios.get(
        process.env.REACT_APP_HOST + "/EuclideV2/api/admin/user/usercheck",
        {
          params: {
            email: value
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      )
      .then(res => {
        return res.data.status == 'OK'
      }),
    ),
});

const UsernameField = (props) => {
  const {
    values: { name, surname },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    if (
      name.trim() !== '' &&
      surname.trim() !== '' &&
      touched.name &&
      touched.surname
    ) {
      setFieldValue(props.name, `${name.toLowerCase().slice(0,1)}${surname.toLowerCase().replace(/ /g,'')}`);
    }
  }, [name, surname, touched.name, touched.surname, setFieldValue, props.name]);

  return (
    <FInput {...props} {...field} />
  );
};

class ModalAddUser extends React.Component {
  state = {
    loading: false,
    visible: false,
    addresses: [],
    selectedAddresses: []
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({ loading: false, visible: false });
  }

  getAddresses = () => {
    redaxios.get(
      process.env.REACT_APP_HOST + "/EuclideV2/api/admin/user/addresses",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.ok) {
        this.setState({ addresses: res.data });
      }
    })
    .catch((error) => console.log("error", error));
  }

  selectAddress = (id) => {
    const { addresses, selectedAddresses } = this.state;
    const selected = addresses.find(e => e.id == id);

    if (selected) {
      this.setState({
        selectedAddresses: [
          ...selectedAddresses,
          selected
        ]
      });
    }
  }

  deselectAddress = (id) => {
    const { addresses, selectedAddresses } = this.state;
    const deselected = addresses.find(e => e.id == id)

    if (deselected) {
      this.setState({
        selectedAddresses: selectedAddresses.filter(e => e.id != deselected.id)
      })
    }
  }

  clearSelectedAddresses = () => {
    this.setState({
      selectedAddresses: []
    });
  }

  render() {
    const { visible, loading, addresses, selectedAddresses } = this.state;
    return (
      <div>
        <Tooltip title='Add user'>
          <Button size="large" type="default" onClick={this.showModal}>
            <Icon type="user-add" />
          </Button>
        </Tooltip>
        <Formik
            initialValues={{
              name: '',
              surname: '',
              username: '',
              email: ''
            }}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              redaxios.post(
                process.env.REACT_APP_HOST + "/EuclideV2/api/admin/user",qs.stringify({
                  name:data.name,
                  surname:data.surname,
                  username:data.username,
                  email:data.email,
                  // select_all:data.select_all,
                  adress_selected:JSON.stringify(selectedAddresses.map((address) => address.id))
                }),
                {
                  headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                  },
                  withCredentials: true,
                }
              )
              .then((res) => {
                setSubmitting(false);
                if (res.data.message == 'success') {
                  this.hideModal();
                  resetForm();
                  this.clearSelectedAddresses();
                  message.success({ content: 'User created', key: 'userSave', duration: 10 });
                } else {
                  message.error({ content: 'A error occur', key: 'userSave', duration: 10 });
                }
              })
              .catch((error) => {
                setSubmitting(false);
                message.error({ content: 'A error occur', key: 'userSave', duration: 10 });
                console.log("error", error)
              });
            }}
            validationSchema={userSchema}
          >
            {({
              values,
              isSubmitting,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Form>
                <Modal
                  visible={visible}
                  title="Add a User"
                  onCancel={() => {
                    resetForm();
                    this.clearSelectedAddresses();
                    this.hideModal();
                  }}
                  footer={[
                    <Button key="back" onClick={() => {
                      resetForm();
                      this.clearSelectedAddresses();
                      this.hideModal();
                    }}>
                      Return
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  ]}
                >

                  <FInput
                    key="name"
                    name="name"
                    label="Name"
                  />
                  <FInput
                    key="surname"
                    name="surname"
                    label="Surname"
                  />
                  <UsernameField
                    key="username"
                    name="username"
                    label="Username"
                  />
                  <FInput
                    key="email"
                    name="email"
                    label="Email"
                  />
                  <div className="inputContainer">
                    <label htmlFor="addresses">Addresses</label>
                    <Field
                      component={Select}
                      name="addresses"
                      style={{ width: "100%" }}
                      mode="multiple"
                      onDropdownVisibleChange={(open) => open ? this.getAddresses() : null}
                      onSelect={this.selectAddress}
                      onDeselect={this.deselectAddress}
                      filterOption={true}
                      optionFilterProp={'content'}
                      value={selectedAddresses.map(elem => elem.id)}
                    >
                      {addresses.map((elem) => (
                        <Select.Option key={elem.id} value={elem.id} content={elem.addressid} >
                          {elem.addressid}
                        </Select.Option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="addresses"
                      render={(msg) => <Typography.Text type="danger">{msg}</Typography.Text>}
                    />
                  </div>
                </Modal>
              </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default ModalAddUser;

import React, { useState } from "react";
import { Table, Icon, Tag, Tooltip, Typography, Button, Popconfirm, Popover, Modal, Select } from "antd";
import redaxios from "redaxios";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from "formik";
import Highlighter from "react-highlight-words";
import qs from "qs";

const { Text, Paragraph } = Typography;

function UserRole(props) {
  const [hover, setHover] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const roles = [];

  const getRoles = () => console.log('get roles')

  const selectRole = (id) => {
    const selected = roles.find(e => e.id == id);

    if (selected) {
      setSelectedRole(selected);
    }
  }

  const deselectRole = (id) => {
    setSelectedRole(null)
  }

  return (
    <>
      <Tooltip title='Change role'>
        <Button 
          onClick={() => setModalVisible(true)}  
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
      ><Icon type={hover ? "edit" : "team"} /> {props.text}</Button></Tooltip>
      <Modal
        visible={modalVisible}
        title="Change Role"
        onOk={() => console.log('Edit Role')}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={() => console.log('Edit Addresses')}
          >
            Submit
          </Button>
        ]}>
          <Formik
            initialValues={{
              Description: "",
              Types: "",
              Products: "",
              Analysis: "",
              Comments: "",
              
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleFocus,
              handleSubmit
            }) => (
              <Form>
                <div className="inputContainer">
                  <div className="inputContainer">
                      <label htmlFor="role">Role</label>
                      <Field
                        component={Select}
                        name="role"
                        style={{ width: "100%" }}
                        onDropdownVisibleChange={(open) => open ? getRoles() : null}
                        onSelect={selectRole}
                        onDeselect={deselectRole}
                        filterOption={true}
                        optionFilterProp={'content'}
                        value={selectedRole && selectedRole.id}
                      >
                        {roles.map((elem) => (
                          <Select.Option key={elem.id} value={elem.id} content={elem.addressid} >
                            {elem.addressid}
                          </Select.Option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="role"
                        render={(msg) => <Typography.Text type="danger">{msg}</Typography.Text>}
                      />
                    </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
    </>
  )
}

function UserClientLims(props) {
  const { clientLims } = props;
  const [hover, setHover] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddresses, setSlectedAddresses] = useState([]);
  const addresses = [];

  const getAddresses = () => console.log('get address')

  const selectAddress = (id) => {
    const { addresses, selectedAddresses } = this.state;
    const selected = addresses.find(e => e.id == id);

    if (selected) {
      setSlectedAddresses([
        ...selectedAddresses,
        selected
      ]);
    }
  }

  const deselectAddress = (id) => {
    const deselected = addresses.find(e => e.id == id)

    if (deselected) {
      setSlectedAddresses(selectedAddresses.filter(e => e.id != deselected.id))
    }
  }

  return (
    <>
      <span
          style={{width: '100%'}}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
      {
        clientLims.length > 0 && <Popover
          title={<Text><Icon type="environment"/> Allocated Addresses</Text>}
          content={(
            <>
              <Paragraph>
              {
                clientLims.map(client => (
                  <Text style={{textAlign: 'center'}} key={client.id}>{client.addressid} <br /></Text>
                ))
              }
              </Paragraph>
              <Button size="small" type="dashed" icon="plus" onClick={() => setModalVisible(true)}>Allocate Addresses</Button>
            </>
          )}
        >
          <Icon type="unordered-list" />
        </Popover>
      }
      </span>
      <Modal
        visible={modalVisible}
        title="Allocate Addresses"
        onOk={() => console.log('Edit Addresses')}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={() => console.log('Edit Addresses')}
          >
            Submit
          </Button>
        ]}
      >
        <Formik
          initialValues={{
            Description: "",
            Types: "",
            Products: "",
            Analysis: "",
            Comments: ""
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({
            values,
            isSubmitting,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleFocus,
            handleSubmit
          }) => (
            <Form>
              <div className="inputContainer">
                <div className="inputContainer">
                    <label htmlFor="addresses">Addresses</label>
                    <Field
                      component={Select}
                      name="addresses"
                      style={{ width: "100%" }}
                      mode="multiple"
                      onDropdownVisibleChange={(open) => open ? getAddresses() : null}
                      onSelect={selectAddress}
                      onDeselect={deselectAddress}
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
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

class DatatableUserConfig extends React.Component {
  state = {
    data: [],
    pagination: {
      total: null,
      current: 1,
      pageSize: 5
    },
    sorter: {
      field: 'username',
      order: 'asc',
    },
    filters: null,
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }
  componentDidUpdate(prevProps, prevState,) {
    if (
      prevState.pagination.current != this.state.pagination.current ||
      prevState.sorter.field != this.state.sorter.field ||
      prevState.sorter.order != this.state.sorter.order||
      prevState.filters != this.state.filters ||
      prevProps.search != this.props.search
    ) {
      this.fetch({search: this.props.search});
    }
  }

  handleChangeId = (val) => {
    this.setState({ userInfo: val });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    
    const sort = {...this.state.sorter}
    sort.field = sorter && sorter.field ? sorter.field : sort.field
    sort.order = sorter && sorter.field ? sorter.order : sort.order
    
    const search = filters ? 
      Object.keys(filters)?.reduce(
        (current, key) => Object.assign(
          current,
          {[key]: filters[key]}
        ), 
        {}
      ) : 
      {...this.state.filters}

    this.setState({
      pagination: pager,
      sorter: sort,
      filters: search
    });
  };

  fetch = ({search = null} = {}) => {
    const { pagination, sorter, filters } = this.state;
    this.setState({ loading: true });
    redaxios.get(
      process.env.REACT_APP_HOST + "/EuclideV2/api/admin/user",
      {
        params: {
          length : pagination.pageSize,
          start: pagination.pageSize * (pagination.current - 1),
          field: sorter.field,
          order: sorter.order,
          filters: qs.stringify(filters),
          search: search || ''
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.ok) {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.recordsFiltered;
        this.setState({
          loading: false,
          data: res.data.results,
          pagination,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    })
    .catch((error) => {
      console.log("error", error)
      this.setState({
        loading: false,
      });
    });
  };

  render() {
      const columns = [
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
          sorter: true,
          defaultSortOrder: "ascend",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: true,
        },
        {
          title: "Surname",
          dataIndex: "surname",
          key: "surname",
          sorter: true,
        },
        {
          title: "Date Created",
          dataIndex: "dateCreated",
          key: "dateCreated",
          sorter: true,
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: true,
          align: 'center',
          render: status => (
            <Tag color={status == 1 ? 'green' : status == 2 ? 'orange' : 'red'}>
              {status == 1 ? 'activated' : status == 2 ? 'suspended' : 'disabled'}
            </Tag>
          ),
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          sorter: true,
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          sorter: false,
          render: role => (
            <UserRole text={role}/>
          ),
        },
        {
            title: "Lims Clients",
            dataIndex: "clientLims",
            key: "clientLims",
            sorter: false,
            align: 'center',
            render: clientLims => (
              <UserClientLims clientLims={clientLims}/>
            ),
          },
          {
              title: "More actions",
              dataIndex: "actions",
              key: "actions",
              sorter: false,
              align: 'center',
              render: () => (
                <span>
                  <Popconfirm
                    title="Are you sure you want to activate this User?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title='Activate'>
                      <Button type="default" size="small" icon="like" onClick={() => console.log('Activate user')} />
                    </Tooltip>
                  </Popconfirm> <Popconfirm
                    title="Are you sure you want to disable this User?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title='Disable'>
                      <Button type="default" size="small" icon="dislike" onClick={() => console.log('Disable user')} />
                    </Tooltip>
                  </Popconfirm> <Popconfirm
                    title="Change password !"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title='Change password'>
                      <Button type="default" size="small" icon="swap" onClick={() => console.log('Change user password')}/>
                    </Tooltip>
                  </Popconfirm> <Popconfirm
                    title="A new password will be generate for the user. Are you sure you want to reset the User password?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title='Reset password'>
                      <Button type="default" size="small" icon="lock" onClick={() => console.log('Reset user password')}/>
                    </Tooltip>
                  </Popconfirm> <Popconfirm
                    title="Are you sure, you want to suspend this User?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title='Suspend'>
                      <Button type="default" size="small" icon="stop" onClick={() => console.log('Suspend user')}/>
                    </Tooltip>
                  </Popconfirm>
                </span>
              ),
            },
      ];
      return (
        <>
          <Table
            style={{ backgroundColor: "white" }}
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        </>
      );
}
}
export default withRouter(DatatableUserConfig);

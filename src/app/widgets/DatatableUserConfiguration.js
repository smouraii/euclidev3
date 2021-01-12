import React from "react";
import { Table, Icon, Tag, Tooltip, Typography } from "antd";
import redaxios from "redaxios";
import { withRouter } from "react-router-dom";
import Highlighter from "react-highlight-words";
import qs from "qs";

const { Text } = Typography;

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
        },
        {
            title: "Lims Clients",
            dataIndex: "clientLims",
            key: "clientLims",
            sorter: false,
            align: 'center',
            render: clientLims => (
              clientLims.length > 0 && <Tooltip title={clientLims.map(client => (
                  <Text style={{color: 'white'}} key={client.id}>{client.addressdesc} <br /></Text>
              ))}>
                <Icon type="unordered-list" />
              </Tooltip>
              
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

import React from "react";
import { Table, Input, Button, Icon, Checkbox, Space, DatePicker } from "antd";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import Highlighter from "react-highlight-words";
import {
  PortletBody,
  Portlet,
  PortletHeader,
} from "../partials/content/Portlet";

import { Label } from "reactstrap";

class DatatableUserConfig extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: "",
    searchedColumn: "",
    userInfo: null,
  };

//   componentDidMount() {
//     this.fetch();
//   }
  componentDidUpdate() {
    console.log(this.state.userInfo,"userinfo");
  }

  handleChangeId = (val) => {
    this.setState({ userInfo: val });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
  };

//   fetch = (params = {}) => {
//     this.setState({ loading: true });
//     reqwest({
//       url: "https://randomuser.me/api",
//       method: "get",
//       data: {
//         results: 10,
//         ...params,
//       },
//       type: "json",
//     }).then((data) => {
//       console.log(data);
//       const mapData = data.results.map((user) => {
//         return {
//           ...user,
//           name: `${user.name.first} ${user.name.last}`,
//           location: `${user.location.country} ${user.location.state}`,
//           date:`${user.dob.date}`,
//           age:`${user.dob.age}`,
//         };
//       });
//       const pagination = { ...this.state.pagination };
//       // Read total count from server
//       // pagination.total = data.totalCount;
//       pagination.total = 200;
//       this.setState({
//         loading: false,
//         data: mapData,
//         pagination,
//       });
//     });
//   };

  //Search Function for text Areas
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        {console.log(dataIndex)}
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex.first)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex.first)
          }
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <Icon type="search" style={{ marginBottom: 10 }} />
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  e;

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onShowSizeChange = (current, pageSizeOptions) => {
    this.setState({ pageSizeOptions });
    console.log(current, pageSizeOptions);
  };

  //SearchFunction For Date
  getColumnSearchPropsDate = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      autoFocus,
      handleChange,
      placeholder,
      value,
      format,
      handleSearch,
      handleClear,
    }) => (
      <div style={{ padding: 8 }}>
        <DatePicker.RangePicker
          autoFocus={autoFocus}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          format={format}
          style={{ marginBottom: 8 }}
        />
        <Button
          type="primary"
          role="search"
          onClick={handleSearch}
          style={{ width: 90 }}
          size="small"
        >
          search
        </Button>
        <Button
          role="reset"
          style={{ width: 90 }}
          onClick={handleClear}
          size="small"
        >
          reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  render() {

      const columns = [
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
          sorter: (a, b) => a.username.value - b.username.value,
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          width: "20%",
          ...this.getColumnSearchProps("name"),
        },
        {
          title: "Surname",
          dataIndex: "surname",
          key: "surname",
          defaultSortOrder: "descend",
          //dob is date of birth from api
          //a b used to sort from big to small
          sorter: (a, b) => a.surname - b.surname,
          ...this.getColumnSearchProps("surname"),
        },
        {
          title: "Date Created",
          dataIndex: "date",
          key: "date",
          defaultSortOrder: "descend",
          //dob is date of birth from api
          //a b used to sort from big to small
          sorter: (a, b) => a.date - b.date,
          ...this.getColumnSearchPropsDate("date"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          sorter: (a, b) => a.status.length - b.status.length,
          filters: [
            { text: "Activated", value: "activated" },
            { text: "Disabled", value: "disabled" },
            { text: "Suspended", value: "suspended" },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          sorter: (a, b) => a.email.localeCompare(b.email),
          ...this.getColumnSearchProps("email"),
        },
        {
          title: "Role",
          dataIndex: "role",
          key: "role",
          sorter: (a, b) => a.role.localeCompare(b.role),
          ...this.getColumnSearchProps("role"),
        },
        {
            title: "Lims Clients",
            dataIndex: "limsClients",
            key: "limsClients",
            sorter: (a, b) => a.limsClients.localeCompare(b.limsClients),
            ...this.getColumnSearchProps("limsClients"),
          },
      ];
      return (
        <>
          <Table
            style={{ backgroundColor: "white" }}
            columns={columns}
            rowKey={(record) => record.login.uuid}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />

          {console.log(this)}
        </>
      );
}
}
export default withRouter(DatatableUserConfig);

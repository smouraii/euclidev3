import React from "react";
import { Table, Input, Button, Icon, Checkbox, Space, DatePicker } from "antd";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import QueryBuilder from "./QueryBuilder";
import Highlighter from "react-highlight-words";

class Datatable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: "",
    searchedColumn: "",
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters
    // });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 10,
        ...params,
      },
      type: "json",
    }).then((data) => {
      console.log(data);
      const mapData = data.results.map((user) => {
        return {
          ...user,
          name: `${user.name.first} ${user.name.last}`,
          location: `${user.location.country} ${user.location.state}`,
        };
      });
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: mapData,
        pagination,
      });
    });
  };

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
  };e

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
        title: "id",
        dataIndex:"id",
        key:"id",
        render: (id) => <a href="#" >{`${id.name}`}</a>,
        sorter: (a,b) => a.id.name - b.id.name,
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
        title: "age",
        dataIndex: "dob",
        key: "age",
        defaultSortOrder: "descend",
        //dob is date of birth from api
        render: (dob) => `${dob.age}`,
        //a b used to sort from big to small
        sorter: (a, b) => a.dob.age - b.dob.age,
      },
      {
        title: "Date",
        dataIndex: "dob",
        key: "date",
        defaultSortOrder: "descend",
        //dob is date of birth from api
        render: (dob) => `${dob.date}`,
        //a b used to sort from big to small
        sorter: (a, b) => a.dob.date - b.dob.date,
        ...this.getColumnSearchPropsDate("date"),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        sorter: (a, b) => a.gender.length - b.gender.length,
        filters: [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" },
        ],
        onFilter: (value, record) => record.gender.indexOf(value) === 0,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        sorter: (a, b) => a.location.localeCompare(b.location),
        ...this.getColumnSearchProps("location"),
      },
    ];

    return (
      <>
        {this.props.match.path === "/folderlist" && (
          <>
            {" "}
            <div className="d-flex justify-content-end">
              {/* <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 ,margin:20}}
    /> */}
            </div>
            <QueryBuilder data={this.state.data} />
          </>
        )}
        {/* <Pagination
        pagination={this.state.pagination}
      showSizeChanger
      onShowSizeChange={this.onShowSizeChange}
      top

    /> */}
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
export default withRouter(Datatable);

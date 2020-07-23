  import React from "react";
import { Table, Input, Button, Icon, Checkbox, Space, DatePicker } from "antd";
import reqwest from "reqwest";
import { withRouter } from "react-router-dom";
import QueryBuilder from "./QueryBuilder";
import Highlighter from "react-highlight-words";
import {
  PortletBody,
  Portlet,
  PortletHeader,
} from "../partials/content/Portlet";

import { Label } from "reactstrap";
import ModalAttachementList from "./ModalAttachement";

class Datatable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: "",
    searchedColumn: "",
    userInfo: null,
  };

  componentDidMount() {
    this.fetch();
  }
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
      url: "",
      method: "get",
      data: {
        results: 10,
        ...params,
      },
      type: "json",
    }).then((data) => {
      console.log(data);
      // const mapData = data.results.map((user) => {
      //   return {
      //     ...user,
      //     name: `${user.name.first} ${user.name.last}`,
      //     location: `${user.location.country} ${user.location.state}`,
      //     date:`${user.dob.date}`,
      //     age:`${user.dob.age}`,
      //   };
      // });
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: pagination,
        // mapData,
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
    if (this.state.userInfo === null) {
      const columns = [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          render: (id, val) => (
            <Button
              type="link"
              onClick={() => this.handleChangeId(val)}
            >{`${id.value}`}</Button>
          ),
          sorter: (a, b) => a.id.value - b.id.value,
        },
        {
          title: "Request id",
          dataIndex: "s_requestid",
          key: "s_requestid",
          sorter: (a, b) => a.s_requestid.localeCompare(b.s_requestid),
          width: "20%",
          ...this.getColumnSearchProps("s_requestid"),
        },
        {
          title: "Creation Date",
          dataIndex: "createdt",
          key: "createdt",
          defaultSortOrder: "descend",
          //dob is date of birth from api
          //a b used to sort from big to small
          sorter: (a, b) => a.createdt - b.createdt,
          ...this.getColumnSearchPropsDate("createdt"),
        },
        {
          title: "Request status",
          dataIndex: "requeststatus",
          key: "requeststatus",
          sorter: (a, b) => a.requeststatus.length - b.requeststatus.length,
          filters: [
            { text: "Draft", value: "draft" },
            { text: "Open", value: "open" },
          ],
          onFilter: (value, record) => record.requeststatus.indexOf(value) === 0,
        },
        {
          title: "Request description",
          dataIndex: "requestdesc",
          key: "requestdesc",
          defaultSortOrder: "descend",
          //dob is date of birth from api
          //a b used to sort from big to small
          sorter: (a, b) => a.requestdesc - b.requestdesc,
          ...this.getColumnSearchProps("requestdesc"),
        },
        {
          title: "Address description",
          dataIndex: "addressdesc",
          key: "addressdesc",
          sorter: (a, b) => a.addressdesc.localeCompare(b.addressdesc),
          ...this.getColumnSearchProps("addressdesc"),
        },
        {
          title: "Address Type",
          dataIndex: "addresstype",
          key: "addresstype",
          sorter: (a, b) => a.addresstype.localeCompare(b.addresstype),
          ...this.getColumnSearchProps("addresstype"),
        },
        {
          title: "Attachment",
          dataIndex: "attachment",
          key: "attachment",
          render: (id, val) => (
            <ModalAttachementList/>
          ),
          sorter: (a, b) => a.id.value - b.id.value,
        }
      ];

      return (
        <>
              <QueryBuilder data={this.state.data} />
            
          
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
    } else {
      const data = [];
      const columns1 = [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          render: (id) => `${id.value}`,
          sorter: (a, b) => a.id.value - b.id.value,
        },
        {
          title: "s_Request id",
          dataIndex: "s_requestid",
          key: "s_requestid",
          sorter: (a, b) => a.s_requestid.localeCompare(b.s_requestid),
          width: "20%",
          ...this.getColumnSearchProps("s_requestid"),
        },
        {
          title: "Created date",
          dataIndex: "createdt",
          key: "createdt",
          defaultSortOrder: "descend",
          //a b used to sort from big to small
          sorter: (a, b) => a.createdt - b.createdt,
        },
        {
          title: "Request status",
          dataIndex: "requeststatus",
          key: "requeststatus",
        },
        {
          title: "Request Description",
          dataIndex: "requestdesc",
          key: "requestdesc",
          ...this.getColumnSearchProps("requestdesc"),
        },
        {
          title: "Address desc",
          dataIndex: "addressdesc",
          key: "addressdesc",
          ...this.getColumnSearchProps("addressdesc"),
        },
      ];
      const columns2 = [
        {
          title: "Sample",
          dataIndex: "sample",
          key: "sample",
          sorter: (a, b) => a.sample.localeCompare(b.sample),
          width: "20%",
          ...this.getColumnSearchProps("sample"),
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "	status",
          sorter: (a, b) => a.status.localeCompare(b.status),
          ...this.getColumnSearchProps("	status"),
        },
        {
          title: "Request ID Evo",
          dataIndex: "requestidevo",
          key: "	requestidevo",
          sorter: (a, b) => a.requestidevo.localeCompare(b.requestidevo),
          ...this.getColumnSearchProps("	requestidevo"),
        },
      ];
      const columns3 = [
        {
          title: "Sample",
          dataIndex: "sample",
          key: "sample",
          render: (sample) => `${sample.value}`,
          sorter: (a, b) => a.sample.value - b.sample.value,
        },
        {
          title: "Test",
          dataIndex: "test",
          key: "test",
          sorter: (a, b) => a.test.localeCompare(b.test),
        },
      ];

      return (
        <>
          <div className="row row-no-padding row-col-separator-x1">
            <div className="col-xl-12">
              <Portlet>
                <PortletBody fit={true}>
                  <PortletHeader title="Details" />
                  <Table
                    style={{ backgroundColor: "white", padding: 20 }}
                    columns={columns1}
                    rowKey={(record) => record.login.uuid}
                    dataSource={[this.state.userInfo]}
                    // pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
                </PortletBody>
              </Portlet>
              <Portlet>
                <PortletBody fit={true}>
                  <PortletHeader title="Sample" />
                  <Table
                    style={{ backgroundColor: "white" }}
                    columns={columns2}
                    rowKey={(record) => record.login.uuid}
                    dataSource={[this.state.userInfo]}
                    // pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
                </PortletBody>
              </Portlet>
              <Portlet>
                <PortletBody fit={true}>
                <PortletHeader title="Results" />
                  <Table
                    style={{ backgroundColor: "white" }}
                    columns={columns3}
                    rowKey={(record) => record.login.uuid}
                    dataSource={[this.state.userInfo]}
                    // pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
                </PortletBody>

                {console.log(this)}
              </Portlet>
            </div>
          </div>
        </>
      );
    }
  }
}
export default withRouter(Datatable);

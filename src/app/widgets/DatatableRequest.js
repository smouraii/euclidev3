import React from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Icon,
  Tag,
} from "antd";
import reqwest from "reqwest";
import Highlighter from "react-highlight-words";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editingKey: "" };
    this.columns = [
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        sorter: (a, b) => a.description.localeCompare(b.description),
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Product",
        dataIndex: "products",
        key: "products",
        sorter: (a, b) => a.products.localeCompare(b.products),
        ...this.getColumnSearchProps("products"),
      },
      {
        title: "Sample Template",
        dataIndex: "sampleTemplate",
        key: "sampleTemplate",
        sorter: (a, b) => a.sampleTemplate.localeCompare(b.sampleTemplate),
        ...this.getColumnSearchProps("sampleTemplate"),
      },
      {
        title: "Sample Count",
        dataIndex: "sampleCount",
        key: "sampleCount",
        sorter: (a, b) => a.sampleCount.localeCompare(b.sampleCount),
        ...this.getColumnSearchProps("sampleCount"),
      },
      {
        title: "Shipping Location",
        dataIndex: "shippingLocation",
        key: "shippingLocation",
        sorter: (a, b) => a.shippingLocation.localeCompare(b.shippingLocation),
        ...this.getColumnSearchProps("shippingLocation"),
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        sorter: (a, b) => a.contact.localeCompare(b.contact),
        ...this.getColumnSearchProps("contact"),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (a, b) => a.quantity.localeCompare(b.quantity),
        ...this.getColumnSearchProps("quantity"),
      },
      {
        title: "Quantity Units",
        dataIndex: "quantityUnits",
        key: "quantityUnits",
        sorter: (a, b) => a.quantityUnits.localeCompare(b.quantityUnits),
        ...this.getColumnSearchProps("quantityUnits"),
      },
      {
        title: "Work Item",
        dataIndex: "workItem",
        key: "workItem",
        render: (a) => (
          <div>
            {a.map((item) => (
              <p key={item}>
                {item}
              </p>
            ))}
          </div>
        ),
        sorter: (a, b) => a.workItem.localeCompare(b.workItem),
        ...this.getColumnSearchProps("workItem"),
      },
    ];
  }

  tableStyle() {
    return this.props.isFull ? { height: "100vh" } : null;
  }

  // componentDidMount() {
  //   this.fetch();
  // }

  // fetch = (params = {}) => {

  //   this.setState({ loading: true });
  //   reqwest({
  //     url: "https://randomuser.me/api",
  //     method: "get",
  //     data: {
  //       results: 20,
  //       ...params
  //     },
  //     type: "json"
  //   }).then(data => {
  //     // console.log(data)
  //     const mapData = data.results.map((user, i)=>{
  //       return{
  //         ...user,
  //         name:`${user.name.first} ${user.name.last}`,
  //         location:`${user.location.country} ${user.location.state}`,
  //         key:`${i}`
  //       }
  //     })
  //     const pagination = { ...this.state.pagination };
  //     // Read total count from server
  //     // pagination.total = data.totalCount;
  //     pagination.total = 200;
  //     console.log(mapData)
  //     this.setState({
  //       loading: false,
  //       data: mapData,
  //       pagination
  //     });
  //   });
  // };

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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onShowSizeChange = (current, pageSizeOptions) => {
    this.setState({ pageSizeOptions });
    console.log(current, pageSizeOptions);
  };

  isEditing = (record) => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          style={this.tableStyle()}
          components={components}
          bordered
          dataSource={this.props.tableData}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const DatatableRequest = Form.create()(EditableTable);
export default DatatableRequest;

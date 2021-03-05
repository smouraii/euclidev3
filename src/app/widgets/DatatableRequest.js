import React, { useState } from "react";
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

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

function EditableTable(props) {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState([]);
  const [columns, setColumns] = useState(null);
  const [count,setCount]= useState(0);
  const[dataSource,setDataSource]=useState([]);
  console.log("propstableRequest", props);

  const handleAdd = () => {
    const newData = {
      key: count,
      name: "",
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData])
    setCount(count+1);
  };
 const  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    setDataSource(dataSource.filter(item => item.key !== key) )
  };

 const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData)
  };


  React.useEffect(() => {
    if (!props.columns) return;
    const mapColumns = props.columns.map((column, index) => ({
      title: column.columntitle,
      dataIndex: column.sdccolumnid,
      key: column.sdccolumnid,
    }));
    setColumns(mapColumns);
    console.log(mapColumns);
  }, []);

  const tableStyle = () => {
    return props.isFull ? { height: "100vh" } : null;
  };

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

  const isEditing = (record) => record.key === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  // save = e => {
  //   const { record, handleSave } = this.props;
  //   this.form.validateFields((error, values) => {
  //     if (error && error[e.currentTarget.id]) {
  //       return;
  //     }
  //     this.toggleEdit();
  //     handleSave({ ...record, ...values });
  //   });
  // };

  const save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    });
  };

  const edit = (key) => {
    this.setState({ editingKey: key });
  };

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  // const columnsTable = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       inputType: col.dataIndex === "age" ? "number" : "text",
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: this.isEditing(record),
  //     }),
  //   };
  // });

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add a row
      </Button>
      <Table
        style={tableStyle()}
        components={components}
        bordered
        dataSource={props.tableData}
        columns={columns}
        rowClassName={() => "editable-row"}
      />
    </div>
  );
}

const DatatableRequest = Form.create()(EditableTable);
export default DatatableRequest;

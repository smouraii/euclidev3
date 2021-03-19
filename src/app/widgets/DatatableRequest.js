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
import "../../component.css"

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

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
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
        })(
          <Input
            ref={(node) => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
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

export default function EditableTable(props) {
  const [columns, setColumns] = useState([]);
  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  console.log("propstableRequest", props);

  React.useEffect(()=>{
    
  },[])

  const handleAdd = () => {
     setCount(count);
     setDataSource(dataSource);
    const newData = {
      key: count,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  React.useEffect(() => {
    if (!props.columns) return;
    const mapColumns = props.columns.map((column, index) => ({
      title: column.columntitle || column.sdccolumnid,
      dataIndex: column.sdccolumnid,
      key: column.sdccolumnid,
      editable: true,
    }));
    mapColumns.push({
      title: "operation",
      dataIndex: "operation",
      render: (text, record) =>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
    });
    setColumns(mapColumns);
    console.log("mapColumns:", mapColumns);
  }, []);

  const tableStyle = () => {
    return props.isFull ? { height: "100vh" } : null;
  };

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const columnsTable = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        style={tableStyle()}
        components={components}
        bordered
        dataSource={dataSource}
        columns={columnsTable}
        rowClassName={() => "editable-row"}
      />
    </div>
  );
}


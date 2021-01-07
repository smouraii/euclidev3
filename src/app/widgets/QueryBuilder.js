import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";
import { Modal, Button, Input, Menu, Dropdown } from "antd";




//ADD COLUMN ID + NA IF DATA IS NULL or Unindefined
// You need to provide your own config. See below 'Config format'

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };

export default class QueryBuilder extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), this.config),
    config: this.config,
    value: "",
    input: "",
    visible: false,
    selectedItem: null,
  };

   getType = (type) => {
    if (type === 'String') {
      return 'text';
    } else if (type === 'Number') {
      return 'number'
    } else {
      return 'select'
    }
  }

  convertedColumnsData = this.props.columnsData.columns.map(elem => ({
    label: elem.title,
    type: this.getType(elem.type),
    valueSources: ["value"],
    fieldSettings: elem.association.hasAssociation ? { listValues: 
      elem.association.values.map((val) => ({ value: val.defaultValue, title: val.defaultValue }))
    } : null
  }))

  config= {
    ...BasicConfig,
    fields: {
      ...this.convertedColumnsData
    },
  };


//function to call data in QueryBuilder

  // add a componentDidMount to Map Data for QueryBuilder
// componentDidMount
// console.log('componentDidMount() lifecycle');

// // Trigger update
// this.setState({ foo: !this.state.foo });
// }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(this.elem);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChangeModal = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  render = () => (
    <div>
      <Query
        {...this.config}
        value={this.state.tree}
        onChange={this.onChange}
        renderBuilder={this.renderBuilder}
      />
      {this.renderResult(this.state)}
    </div>
  );

  renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder ">
        <Builder {...props} />
      </div>
    </div>
  );

  renderResult = ({ tree, tree: immutableTree, config }) => (
    <div className="query-builder-result" style={{ padding: "10px" }}>
      {/* <div>
        SQL where:{" "}
        <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>
      </div>*/}
      <div>
        JsonLogic:{" "}
        <pre>
          {JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}
        </pre>
      </div> 

      <div>
        {this.state.selectedItem ? (
          <>
            <Button
              style={{ marginBottom: 10 }}
              onClick={() => {
                const jsonTree = QbUtils.getTree(immutableTree);
                const queryStoredValue = localStorage.getItem(
                  "queryStoredValue"
                );
                if (queryStoredValue) {
                  console.log("test");
                  const queryStoredArray = JSON.parse(queryStoredValue);
                  const filteredArray = queryStoredArray.filter(
                    (arrayelem) => arrayelem.name !== this.state.selectedItem
                  );

                  filteredArray.push({
                    ...jsonTree,
                    name: this.state.selectedItem,
                  });
                  localStorage.setItem(
                    "queryStoredValue",
                    JSON.stringify(filteredArray)
                  );
                }
                this.setState({ selectedItem: null });
              }}
            >
              Save changes
            </Button>
            <Button
              style={{ marginBottom: 10 }}
              onClick={() => this.setState({ selectedItem: null })}
            >
              Cancel
            </Button>
          </>
        ) : (<div>
          <Button style={{ marginBottom: 10 }} onClick={this.showModal}>
            Save
          </Button>
          <Button style={{ marginBottom: 10 }} >
            Lancer la requete
          </Button>
          </div>
        )}

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={() => {
            const jsonTree = QbUtils.getTree(immutableTree);
            const queryStoredValue = localStorage.getItem("queryStoredValue");
            const array = JSON.parse(queryStoredValue);
            if (queryStoredValue) {
              console.log("testModal");
              localStorage.setItem(
                "queryStoredValue",
                JSON.stringify([
                  ...array,
                  { ...jsonTree, name: this.state.input },
                ])
              );
            } else {
              localStorage.setItem(
                "queryStoredValue",
                JSON.stringify([{ ...jsonTree, name: this.state.input }])
              );
            }
            this.setState({ visible: false, input: "" });
          }}
          onCancel={this.handleCancel}
        >
          <Input placeholder="name" onChange={this.onChangeModal} />
        </Modal>
      </div>

      {localStorage.getItem("queryStoredValue") &&
        JSON.parse(localStorage.getItem("queryStoredValue")).map((elem) => (
          <Dropdown
            style={{ marginRight: 10 }}
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => {
                    this.setState({
                      tree: QbUtils.loadTree(elem, config),
                      selectedItem: elem.name,
                    });
                    console.log(elem, config)
                  }}
                  key="edit"
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    const queryStoredValue = localStorage.getItem(
                      "queryStoredValue"
                    );
                    const queryStoredArray = JSON.parse(queryStoredValue);
                    const filteredArray = queryStoredArray.filter(
                      (arrayelem) => arrayelem.name !== elem.name
                    );
                    localStorage.setItem(
                      "queryStoredValue",
                      JSON.stringify(filteredArray)
                    );
                    this.setState({ visible: false });
                  }}
                  key="delete"
                >
                  Delete
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    this.setState({ tree: QbUtils.loadTree(elem, config) })
                  }
                  key="copy"
                >
                  Create a copy from this query
                </Menu.Item>
              </Menu>
            }
            trigger={["contextMenu"]}
          >
            <Button style={{ marginRight: 10 }} key={elem.name}>
              {elem.name}
            </Button>
          </Dropdown>
        ))}
    </div>
  );

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    this.setState({ tree: immutableTree, config: config });

    // const jsonTree = QbUtils.getTree(immutableTree);
    // console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };
  componentDidMount() {
    const QueryStoredValue = localStorage.getItem("QueryStoredValue");
    this.setState({ QueryStoredValue });
  }

  //    QuerySaveButton =({jsonTree})=>{
  //   const querySaved = jsonTree.length ?( jsonTree.map(jsonTree =>{
  //     return(
  //       <div className="querySaveButton" key={jsonTree.id}>
  //         <Button onclick={()=>{this.handleClick(jsonTree.id)}}>{jsonTree.content}</Button>
  //       </div>
  //     )
  //   }
  //     )): (<p> you have no saved query </p>)
  //     return(
  //       <div>
  //       <Button>test</Button>
  //         {querySaved}
  //       </div>

  //     )
  // }
}

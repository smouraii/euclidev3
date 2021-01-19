import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  // AntdConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";
import { Modal, Button, Input, Menu, Dropdown } from "antd";
import redaxios from "redaxios";
import qs from "qs";
// import AntdConfig from "react-awesome-query-builder/lib/config/antd";
// import 'react-awesome-query-builder/css/antd.less';

// const InitialConfig = AntdConfig;

const config = {
  ...BasicConfig,
  fields: {},
};

// const getConfig = async (props) => {
//   if (!props.columnsData || props.columnsData.lenght < 2) return;
//   const getType = (type) => {
//     if (type === "String") {
//       return "text";
//     } else if (type === "Number") {
//       return "number";
//     } else {
//       return "select";
//     }
//   };
//   console.log("lenght", props.columnsData.lenght);
//   console.log("ColumnsData", props.columnsData);

//     //add logic for when hasAssociation is true but the values are not there need to add a get methode to fetch my data with an API that takes package+domaine and params(refer to exemple)
//     //exemple of the API
// // url:'/'+pathArray[1]+',

//   return {
//     ...BasicConfig,
//     fields: {
//       ...convertedColumnsData,
//       ...columnsObj,
//     },
//   };
// };

//ADD COLUMN ID + NA IF DATA IS NULL or Unindefined
// You need to provide your own config. See below 'Config format'

// You can load query value from your backend storage (for saving see ,`Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };

export default class QueryBuilder extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
    value: "",
    input: "",
    visible: false,
    selectedItem: null,
    selectedValuesData: null,
  };

  
  //function to call data in QueryBuilder

  getConfig = (columnsData) => {
    const getType = (elem) => {
      if (elem.type === "String") {
        return "text";
      } else if (elem.type === "Number") {
        return "number";
      } else if (elem.type === "Date") {
        return "date";
      } else if (elem.association.hasAssociation === true) {
        return "select";
      }
    };

    //

    const convertedColumnsData = columnsData.columns.reduce((fields, elem) => {
      return {
        ...fields,
        [elem.title]: {
          label: elem.title,
          type: getType(elem),
          valueSources: ["value"],
          fieldSettings:
            elem.association.hasAssociation && elem.association.values != null
              ? {
                  listValues: elem.association.values.map((val) => ({
                    value: val.defaultValue,
                    title: val.defaultValue,
                  })),
                }
              : elem.association.hasAssociation &&
                elem.association.values == null
              ? redaxios
                  .get(
                    `http://localhost:8080/EuclideV2/api/getSelectOptions?dc=${elem.association.package}.${elem.association.domain}&display=${elem.association.displayValue}`,
                    { withCredentials: true }
                  )
                  .then((res) => {
                    this.setState(
                      { selectedValuesData: res.data },
                      {
                        listValues: this.state.selectedValuesData.map(
                          (val) => ({
                            value: val.id,
                            title: val.name,
                          })
                        ),
                      },
                      console.log("SelecOptions", this.state.selectedValuesData)
                    );
                  })
              : null,
        },
      };
    }, {});
    console.log("querybuilderRes", this.selectedValuesData);
    console.log("QueryBuilderData", convertedColumnsData);
    console.log("columnsQuery", columnsData.columns);
    return {
      ...BasicConfig,
      fields: {
        ...convertedColumnsData,
      },
    };
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    if (prevProps.columnsData !== this.props.columnsData) {
      this.setState({ config: this.getConfig(this.props.columnsData) });
    }
  }

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
      {console.log("SelectedValuesData", this.state.selectedValuesData)}
      {console.log("config", this.state.config)}
      <Query
        {...this.state.config}
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

  // componentDidUMount(){
  //   document.querySelector(".query-builder").addEventListener("click", (elem)=>{
  //     redaxios
  //   .get(
  //     `http://localhost:8080/EuclideV2/api/getSelectOptions?dc=${elem.association.package}.${elem.association.domain}&display=${elem.association.displayValue}`,
  //     { withCredentials: true }
  //   )
  //   .then((res) => {
  //     this.setState(
  //       { selectedValuesData: res.data },
  //       {
  //         listValues: this.state.selectedValuesData.map(
  //           (val) => ({
  //             value: val.id,
  //             title: val.name,
  //           })
  //         ),
  //       },
  //       console.log("SelecOptions", this.state.selectedValuesData)
  //     );
  //   })})
  //   console.log()
  //   };

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
                  console.log("queryStoredValue", queryStoredValue);
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
        ) : (
          <div>
            <Button style={{ marginBottom: 10 }} onClick={this.showModal}>
              Save
            </Button>
            <Button
              style={{ marginBottom: 10 }}
              onClick={(columnsData) => {
                const Jsonlogic = {
                  jsonlogic: JSON.stringify(
                    QbUtils.jsonLogicFormat(immutableTree, config)
                  ),
                };
                redaxios
                  .post(
                    `http://localhost:8080/EuclideV2/querybuilder?domain=${columnsData.columns.association.package}.${columnsData.columns.association.domain}&pagelist${columnsData.pagelistid}`,
                    qs.stringify({ rules: Jsonlogic }),
                    {
                      headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        "X-Requested-With": "XMLHttpRequest",
                      },
                      withCredentials: true,
                    }
                  )
                  .then(function(response) {
                    console.log(response);
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }}
            >
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
                  onClick={(columnsData) => {
                    this.setState({
                      tree: QbUtils.loadTree(elem, config),
                      selectedItem: elem.name,
                    });
                    console.log("elements in config liste", elem, config);
                  }}
                  key="edit"
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    redaxios.delete(
                      `http://localhost:8080/EuclideV2/api/querybuilder`,
                      { withCredentials: true }
                    );
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
            <Button
              style={{ marginRight: 10 }}
              key={elem.name}
              onClick={() => {
                //redaxios
                //     .post(
                //       `http://localhost:8080/EuclideV2//api/querybuilder/search?domain=${columnsData.columns.association.package}+.+${columnsData.columns.association.domain}+&pagelist+${columnsData.pagelistid}`,
                //       {
                //         jsonlogic: JSON.stringify(
                //           QbUtils.jsonLogicFormat(immutableTree, config)
                //         ),
                //       },
                //       {
                //         headers: {
                //           "content-type": "application/x-www-form-urlencoded",
                //           "X-Requested-With": "XMLHttpRequest",
                //         },
                //         withCredentials: true,
                //       }
                //     )
                //     .then(function(response) {
                //       console.log(response);
                //     })
                //     .catch(function(error) {
                //       console.log(error);
                //     })
              }}
            >
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

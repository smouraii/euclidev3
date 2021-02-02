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
import SelectQuery from "./SelectQuery";
// import AntdConfig from "react-awesome-query-builder/lib/config/antd";
// import 'react-awesome-query-builder/css/antd.less';

// const InitialConfig = AntdConfig;

const config = {
  ...BasicConfig,
  fields: {},
  widgets: {
    ...BasicConfig.widgets,
    selectQuery: {
      ...BasicConfig.widgets.select,
      factory: ({
        value,
        setValue,
        allowCustomValues,
        placeholder,
        customProps,
      }) => {
        const onChange = (e, data) => {
          setValue(data?.value?.value || "");
        };
        return (
          <SelectQuery
            // selectedValuesData={this.state.selectedValuesData}
            placeholder="Select value"
            selectedValue={value}
            onChange={onChange}
            customProps={customProps}
          />
        );
      },
    },
  },
  //cannot  convert  undefined or null to object
  types: {
    ...BasicConfig.types,
    selectQuery: {
      valueSources: ["value", "field", "func"],
      defaultOperator: "equal",
      widgets: {
        selectQuery: {
          operators: ["equal", "between"],
        },
      },
    },
  },
};

//basicConfig

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
console.log("BasicConfig", BasicConfig.types.select);
const queryValue = { id: QbUtils.uuid(), type: "group" };

export default class QueryBuilder extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
    value: "",
    input: "",
    visible: false,
    selectedItem: null,
    selectedValuesData: [],
    queryData: [],
    queryRules: [],
    visibleDelete:false,
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
      } else if (elem.association.hasAssociation && elem.association.values) {
        return "select";
      } else if (elem.association.hasAssociation && !elem.association.values) {
        return "selectQuery";
      }
    };

    //

    const convertedColumnsData = columnsData.columns.reduce((fields, elem) => {
      return {
        ...fields,
        [elem.title]: {
          label: elem.title,
          type: getType(elem),
          widgets:
            getType(elem) === "selectQuery"
              ? {
                  selectQuery: {
                    widgetProps: {
                      customProps: {
                        package: elem.association.package,
                        domain: elem.association.domain,
                        displayValue: elem.association.displayValue,
                      },
                    },
                  },
                }
              : null,
          valueSources: ["value"],
          //add widget with ondropdownChange open if element with association
          fieldSettings:
            elem.association.hasAssociation && elem.association.values
              ? {
                  listValues: elem.association.values.map((val) => ({
                    value: val.defaultvalue,
                    title: val.defaultvalue,
                  })),
                }
              : elem.association.hasAssociation && !elem.association.values
              ? {
                  listValues: this.state.selectedValuesData.map((val) => ({
                    value: val.id,
                    title: val.name,
                  })),
                }
              : null,
        },
      };
    }, {});
    console.log("querybuilderRes", this.selectedValuesData);
    console.log("QueryBuilderData", convertedColumnsData);
    console.log("columnsQuery", columnsData.columns);
    return {
      ...config,
      fields: {
        ...convertedColumnsData,
      },
    };
  };

  //GetSavedQuery
  getQuery() {
    redaxios
      .get(
        `http://localhost:8080/EuclideV2/api/querybuilder?domain=com.euclide.sdc.${this.props.columnsData.sdcid}&pagelist=${this.props.columnsData.pagelistid}`,
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({ queryData: res.data });
        console.log("queryData", res.data);
      });
  }
  mapData() {
    const mapData = this.state.queryData.map((datarow) => ({
      rules: JSON.parse(datarow.rules),
    }));
    this.setState({ queryRules: mapData });
    console.log("queryRules", mapData);
  }

  //change the config State and GetQuery on update
  componentDidUpdate(prevProps, prevState, queryData) {
    console.log("prevProps", prevProps);
    if (prevProps.columnsData !== this.props.columnsData) {
      this.setState({ config: this.getConfig(this.props.columnsData) });
      this.getQuery();
      this.mapData();
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showDeleteModal = () => {
    this.setState({
      visibleDelete: true,
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
  handleDeleteCancel = (e) => {
    console.log(e);
    this.setState({
      visibleDelete: false,
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
  //test d'ajouter le call des le click sur la column du querybuilder

  // componentDidUMount() {
  //   console.log(
  //     "document query selector",
  //     document.querySelector(".query-builder-container")
  //   );

  //   document
  //     .querySelector("div.query-builder-container")
  //     .addEventListener("click", (columnsData) => {
  //       redaxios
  //         .get(
  //           `http://localhost:8080/EuclideV2/api/getSelectOptions?dc=${columnsData.columns.association.package}.${columnsData.columns.association.domain}&display=${columnsData.columns.association.displayValue}`,
  //           { withCredentials: true }
  //         )
  //         .then((res) => {
  //           this.setState(
  //             { selectedValuesData: res.data },
  //             console.log("SelecOptions", this.state.selectedValuesData)
  //           );
  //         });
  //     });
  //   console.log("ComponentDidMount");
  // }

  renderResult = ({ tree, tree: immutableTree, config, queryData }) => (
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
                redaxios
                  .post(
                    `http://localhost:8080/EuclideV2/api/querybuilder?`,
                    {
                      domain: `com.euclide.sdc.${this.props.columnsData.sdcid}`,
                      pagelist: `${this.props.columnsData.pagelistid}`,
                      rules: QbUtils.jsonLogicFormat(immutableTree, config),
                      name: this.state.input,
                      id: this.queryData.id,
                    },
                    {
                      withCredentials: true,
                    }
                  )
                  .then(function(response) {
                    console.log("response", response);
                    window.location.reload();
                  })
                  .catch(function(error) {
                    console.log("error", error);
                  });
                // const jsonTree = QbUtils.getTree(immutableTree);
                // // const queryStoredValue = localStorage.getItem(
                // //   "queryStoredValue"
                // // );
                // if (queryData) {
                //   // console.log("queryStoredValue", queryStoredValue);
                //   const queryStoredArray = queryData.rules;
                //   const filteredArray = queryStoredArray.filter(
                //     (arrayelem) => arrayelem.name !== this.state.selectedItem
                //   );
                //   filteredArray.push({
                //     ...jsonTree,
                //     name: this.state.selectedItem,
                //   });
                //   localStorage.setItem(
                //     "queryStoredValue",
                //     JSON.stringify(filteredArray)
                //   );
                // }
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
              onClick={() => console.log("lancer la requete")}
            >
              Lancer la requete
            </Button>
          </div>
        )}

        <Modal
          title="Add a new Query"
          visible={this.state.visible}
          onOk={() => {
            console.log("columnsDataPost", this.props.columnsData);
            redaxios
              .post(
                `http://localhost:8080/EuclideV2/api/querybuilder`,
                {
                  domain: `com.euclide.sdc.${this.props.columnsData.sdcid}`,
                  pagelist: `${this.props.columnsData.pagelistid}`,
                  rules: QbUtils.jsonLogicFormat(immutableTree, config).logic,
                  name: this.state.input,
                },
                {
                  headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "XMLHttpRequest",
                  },
                  withCredentials: true,
                }
              )
              .then(function(response) {
                console.log("response", response);
                window.location.reload();
              })
              .catch(function(error) {
                console.log("error", error);
              });

            // const jsonTree = QbUtils.getTree(immutableTree);
            // const queryStoredValue = queryData.rules;
            // const array = JSON.parse(queryStoredValue);
            // if (queryStoredValue) {
            //   console.log("testModal");
            //   localStorage.setItem(
            //     "queryStoredValue",
            //     JSON.stringify([
            //       ...array,
            //       { ...jsonTree, name: this.state.input },
            //     ])
            //   );
            // } else {
            //   localStorage.setItem(
            //     "queryStoredValue",
            //     JSON.stringify([{ ...jsonTree, name: this.state.input }])
            //   );
            // }
            this.setState({ visible: false, input: "" });
          }}
          onCancel={this.handleCancel}
        >
          <Input placeholder="name" onChange={this.onChangeModal} />
        </Modal>
      </div>

      {queryData &&
        queryData.map((elem) => (<>
          <Modal
          title="Delete a Query"
          visible={this.state.visibleDelete}
          onOk={() => {
            console.log("Deletequerydata",queryData);
            redaxios
              .delete(
                `http://localhost:8080/EuclideV2/api/querybuilder?id=${elem.id}`,
                { withCredentials: true }
              )
              .then(function(response) {
                console.log("delete", response);
                window.location.reload();
              });
            // const queryStoredValue = localStorage.getItem(
            //   "queryStoredValue"
            // );
            // const queryStoredArray = JSON.parse(queryStoredValue);
            // const filteredArray = queryStoredArray.filter(
            //   (arrayelem) => arrayelem.name !== elem.name
            // );
            // localStorage.setItem(
            //   "queryStoredValue",
            //   JSON.stringify(filteredArray)
            // );
            this.setState({ visibleDelete: false });
          }}
          onCancel={this.handleDeleteCancel}
        >
          <p>Do you really want to delete this Query</p>
        </Modal>
          <Dropdown
            style={{ marginRight: 10 }}
            onDropDownChange={() => console.log(elem)}
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => {
                    console.log(
                      "elements in config liste",
                      JSON.parse(elem.rules),
                      elem,
                      QbUtils.loadFromJsonLogic(
                        JSON.parse(elem.rules),
                        this.state.config
                      )
                    );

                    this.setState({
                      tree: QbUtils.loadFromJsonLogic(
                        JSON.parse(elem.rules),
                        this.state.config
                      ),
                      selectedItem: elem.name,
                    });
                  }}
                  key="edit"
                >
                  Edit
                </Menu.Item>
                <Menu.Item 
                onClick={this.showDeleteModal} key="delete">
                  Delete
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    this.setState({
                      tree: QbUtils.loadFromJsonLogic(
                        JSON.parse(elem.rules),
                        this.state.config
                      ),
                      selectedItem: null,
                    })
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
              onClick={(columnsData) => {
                redaxios
                  .post(
                    `http://localhost:8080/EuclideV2/api/querybuilder/search?domain=${columnsData.columns.association.package}.${columnsData.columns.association.domain}&pagelist=${columnsData.pagelistid}`,
                    {
                      jsonlogic: JSON.stringify(
                        QbUtils.jsonLogicFormat(immutableTree, config)
                      ),
                    },
                    {
                      headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        "X-Requested-With": "XMLHttpRequest",
                      },
                      withCredentials: true,
                    }
                  )
                  .then(function(response) {
                    console.log("search", response);
                    window.location.reload();
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }}
            >
              {/* ajouter le nom de la query récupéré sur this.state.query  depending de l'arborescence */}
              {elem.name}
            </Button>
          </Dropdown>
          </>
        ))}
    </div>
  );

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    console.log("onchageQuery", immutableTree, config);
    this.setState({ tree: immutableTree, config: config });

    // const jsonTree = QbUtils.getTree(immutableTree);
    // console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };
  // componentDidMount() {
  //   const QueryStoredValue = localStorage.getItem("QueryStoredValue");
  //   this.setState({ QueryStoredValue });
  // }

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

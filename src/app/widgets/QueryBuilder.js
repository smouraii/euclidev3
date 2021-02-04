import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";
import { Modal, Button, Input, Menu, Dropdown } from "antd";
import redaxios from "redaxios";
import qs from "qs";
import SelectQuery from "./SelectQuery";


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
if(!columnsData) return;
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
                console.log("querydata edit", queryData, this.state.selectedItem)
                
                redaxios
                  .post(
                    `http://localhost:8080/EuclideV2/api/querybuilder`,
                    {
                      domain: `com.euclide.sdc.${this.props.columnsData.sdcid}`,
                      pagelist: `${this.props.columnsData.pagelistid}`,
                      rules: QbUtils.jsonLogicFormat(immutableTree, config).logic,
                      name: this.state.selectedItem.name,
                      id: this.state.selectedItem.id,
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
                      selectedItem: {"name":elem.name,"id":elem.id}
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
              onClick={() => {
                redaxios
                  .post(
                    `http://localhost:8080/EuclideV2/api/querybuilder/search?domain=com.euclide.sdc.${this.props.columnsData.sdcid}&pagelist=${this.props.columnsData.pagelistid}&attachement=${this.props.columnsData.attachment}`,
                    {
                      savedQueryId:elem.id                    
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
  };
}

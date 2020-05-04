import React, {Component} from 'react';
import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';

// You need to provide your own config. See below 'Config format'
const config = {
  ...BasicConfig,
  fields: {
    Name: {
        label: 'Name',
        type: 'text',
        valueSources: ['value'],

    },
    gender: {
        label: 'Gender',
        type: 'text',
        valueSources: ['value'],
    },
    email: {
        label: 'Email',
        type: 'text',
        valueSources: ['value'],
    },
    location: {
        label: 'Location',
        type: 'text',
        valueSources: ['value'],
    },
    number:{
        label: 'Number',
        type: 'number',
        valueSources:['value'],
        preferWidgets:['number'],
        fieldSettings:{
            min:0,
            max:9999999,
        },
    }
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = {"id": QbUtils.uuid(), "type": "group"};


export default class QueryBuilder extends Component {
    state = {
      tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
      config: config,
      value:'',
    };


     onChange = event => {
        localStorage.setItem('myValueInLocalStorage', this.jsonTree);
     
        this.setValue(this.jsonTree);
      };
    render = () => (
      <div>
        <Query
            {...config} 
            value={this.state.tree}
            onChange={this.onChange}
            renderBuilder={this.renderBuilder}
        />
        {this.renderResult(this.state)}
      </div>
    )

    renderBuilder = (props) => (
      <div className="query-builder-container" style={{padding: '10px'}}>
        <div className="query-builder ">
            <Builder {...props} />
        </div>
      </div>
    )

    renderResult = ({tree: immutableTree, config}) => (
      <div className="query-builder-result" style={{padding: '10px'}}>
          <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>
          <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div>
      </div>
    )
    
    onChange = (immutableTree, config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      this.setState({tree: immutableTree, config: config});

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    }
}
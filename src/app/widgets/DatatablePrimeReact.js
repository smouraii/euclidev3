import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import Column from 'antd/lib/table/Column';


export default class Datatables extends Component {

  constructor() { 
    super();
    this.state = {cars:[]};
}


componentDidMount() {
  fetch('https://jsonplaceholder.typicode.com/posts')

  .then(res=>res.json()).then(res => {console.log(res)
      this.setState({cars:res})})
      .catch(error=>console.log(`error: ${error}`));
}


render() {
    let cols = [
        {field: 'id', header: 'id'},
        {field: 'userId', header: 'userid'},
        {field: 'title', header: 'title'},
        {field: 'body', header: 'body'}
    ];

    let dynamicColumns = cols.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <DataTable value={this.state.cars}>
            {dynamicColumns}
        </DataTable>
    );
}
}

//delete it 

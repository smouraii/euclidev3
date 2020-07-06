import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';

import reqwest from 'reqwest';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export default class AttachementList     extends React.Component {
  state = {
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  render() {
    const { list } = this.state;


    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a target="_blank" href="#">Download</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name.last}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

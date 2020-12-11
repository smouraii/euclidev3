import React, { useState } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import redaxios from 'redaxios';
import reqwest from 'reqwest';

const count = 3;
//add Attachement API here instead of the fakeDataURL
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;



export default function AttachementList() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/d5be868e-8209-40b6-a1be-be19ae4c778d")
      .then((res) => setData(res.data));
  }, []);



  // componentDidMount() {
  //   this.getData(res => {
  //     this.setState({
  //       initLoading: false,
  //       data: res.results,
  //       list: res.results,
  //     });
  //   });
  // }

  // getData = callback => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: 'json',
  //     method: 'get',
  //     contentType: 'application/json',
  //     success: res => {
  //       callback(res);
  //     },
  //   });
  // };


    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
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

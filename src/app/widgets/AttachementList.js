import React, { useEffect, useState } from "react";
import { List, Button, Skeleton } from "antd";
import redaxios from "redaxios";

export default function AttachementList(props) {
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/0b7f436b-e32c-461c-bcce-9989de626b42")
      .then(
        (res) => setData(res.data.data),
        setLoading(false),
        setList(data.filter((elem, i) => i < 2))
      );
  }, []);

  // React.useEffect(()=>{
  // if (!data)return;
  // const mapdata =props.selectedElements.attachments.map((datarow)=>([{
  //   attachmentnum:datarow.attachmentnum ,
  //   keyid1:datarow.keyid1 ,
  //   sdcid:datarow.sdcid ,
  //   attachmentdesc: datarow.attachmentdesc,
  //   id: datarow.id
  // }]))
  // setDataSource(mapdata);
  // console.log("attachement",dataSource)
  // },[data])

  const onLoadMore = () => {
    setLoading(true);
    console.log(data);
    setList(
      list.concat(
        data.filter((elem, i) => i === list.length && i < list.length + 2)
      )
    );
    // this.setState({
    //   loading: true,
    //   list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    // });
    //   this.getData(res => {
    //     const data = this.state.data.concat(res.results);
    //     this.setState(
    //       {
    //         data,
    //         list: data,
    //         loading: false,
    //       },
    //       () => {
    //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //         // In real scene, you can using public method of react-virtualized:
    //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //         window.dispatchEvent(new Event('resize'));
    //       },
    //     );
    //   });
    // };

    // data.map((res) => {
    //   const dataList = data.concat(res.results);
    //   setList(dataList);
    //   setLoading(false);
    // });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list.filter(
        (item) => item.attachments && item.attachments.length
      )}
      renderItem={(item) =>
        item.attachments.map((elem) => (
          <List.Item
            actions={[
              <a target="blank" href="#">
                {elem.attachmentdesc}
              </a>
            ]}
          ></List.Item>
        ))
      }
    />
  );
}

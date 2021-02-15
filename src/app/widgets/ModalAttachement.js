import React, { useEffect, useState } from "react";
import { Modal, Button, Icon, List, Skeleton } from "antd";
import { Formik, Form } from "formik";
import redaxios from "redaxios";

export default function ModalAttachementList(props) {
  //Attachements States
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  //Modal States
  const [loadingModal, setLoadingModal] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("list", list);
  }, [list]);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/0b7f436b-e32c-461c-bcce-9989de626b42")
      .then(
        (res) => setData(res.data.data),
        // setInitLoading(true),
        // setLoading(false),
        setList(data.filter((elem, i) => i < 2))
      );
  }, []);

  //   React.useEffect(()=>{
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
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button type="ghost" onClick={showModal}>
        <Icon type="file" />
      </Button>
      <Modal
        visible={visible}
        title="Attachement list"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingModal}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="inputContainer">
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
                    </a>,
                  ]}
                ></List.Item>
              ))
            }
          />
        </div>
      </Modal>
    </div>
  );
}

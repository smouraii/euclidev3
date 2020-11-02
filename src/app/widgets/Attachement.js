import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Typography } from "antd";
import redaxios from "redaxios";
import { List } from "antd/lib/form/Form";

export default function Attachement() {
  const [modalText, setModatText] = useState();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataMapped, setDataMapped] = useState([]);

  React.useEffect(() => {
    redaxios
      .get("https://run.mocky.io/v3/91f074c8-b503-406f-94aa-b934a2119c2f")
      .then((res) => setData(res.data));
  }, []);
  console.log(data);

  useEffect(() => {
    if (!data) return;
    const mapData = data.data.map((datarow) => datarow.fluxname);
    setDataMapped(mapData);
  }, [data]);
  console.log("dataMapped", dataMapped);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModatText("Sending Data");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  console.log(modalText);
  // const { visible, confirmLoading, ModalText } = this.state;
  return (
    <>
     <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={dataMapped}
      renderItem={item => <List.Item>{item}</List.Item>}
      />
      {/* <Button onClick={showModal}>Attachement</Button>
      <Modal
        title="Attachement"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      > */
      /* </Modal> */}
    </>
  );
}
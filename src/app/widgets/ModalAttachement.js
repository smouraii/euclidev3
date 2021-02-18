import React, { useEffect, useState } from "react";
import { Modal, Button, Icon, List, Skeleton } from "antd";
import { Formik, Form } from "formik";
import redaxios from "redaxios";

export default function ModalAttachementList(props) {
  //Attachements States
  const [list, setList] = useState([]);

  //Modal States
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    setList(props.recordId.filter((elem, i) => i < 2));
  }, [props.recordId]);

  useEffect(() => {
    console.log("list", list);
    console.log("props attachement", props);
  }, [list]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
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
        footer={[
          <Button key="back" type="primary" onClick={handleOk}>
            Return
          </Button>,
        ]}
      >
        <div className="inputContainer">
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list.filter((item) => item && item.length)}
            renderItem={(item) =>
              item.map((elem) => (
                <List.Item
                  actions={[
                    <a
                      target="blank"
                      href={`http://localhost:8080/EuclideV2/api/getAttachment?attachment=${elem.id}`}
                    >
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

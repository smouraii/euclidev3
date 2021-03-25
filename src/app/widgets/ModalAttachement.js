import React, { useEffect, useState } from "react";
import { Modal, Button, Icon, List, Skeleton } from "antd";
import { Formik, Form } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

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

  console.log("recordId", props.recordId);
  console.log("recordListLength", list.length);

  return (
    <>
      {props.recordId.map((row) =>
        row.length > 1 ? (
          <Button type="ghost" onClick={showModal}>
            <Icon type="file" />
          </Button>
        ) : 0 < row.length && row.length < 2 ? (
          <Button
            type="ghost"
            onClick={() =>
              (window.location.href = `${process.env.REACT_APP_HOST}/EuclideV2/api/getAttachment?attachment=${row[0].id}`)
            }
          >
            <Icon type="file" />
          </Button>
        ) : (
          <Button type="ghost" disabled={true}>
            <Icon type="file" />
          </Button>
        )
      )}
      <Modal
        visible={visible}
        title="Attachement"
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
                      href={`${process.env.REACT_APP_HOST}/EuclideV2/api/getAttachment?attachment=${elem.id}`}
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
    </>
  );
}

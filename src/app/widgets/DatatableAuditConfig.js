import React from "react";
import { Table, Divider, Tag, Switch } from "antd";

export default function DatatableAuditConfig() {
  const columns = [
    {
      title: "Propertie",
      dataIndex: "propertie",
      key: "propertie",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Switch />
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      propertie: "folder",
     },
     {
        key: "2",
        propertie: "issue",
       },
       {
        key: "3",
        propertie: "flder",
       },
       {
        key: "4",
        propertie: "flder",
       },
       {
        key: "5",
        propertie: "flder",
       },
       {
        key: "6",
        propertie: "flder",
       },
       {
        key: "7",
        propertie: "flder",
       },
       {
        key: "8",
        propertie: "flder",
       },
                   
  ];
  return <Table columns={columns} dataSource={data} />;
}

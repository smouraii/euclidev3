import React, { useState } from "react";
import { Table, Badge, Menu, Dropdown, Icon } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../../partials/content/Portlet";
import ModalAddRole from "./../../widgets/ModalAddRole";
import TreeList from "../../widgets/Treelist";



export default function SecurityRoles(props) {
  const expandedRowRender = () => {
    return (
      <TreeList />
    );
  };

  const columns = [
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Euclide", dataIndex: "euclide", key: "euclide" },
    { title: "Dashboard", dataIndex: "dashboard", key: "dashboard" },
    { title: "EFiles", dataIndex: "eFiles", key: "eFiles" },
    { title: "bugReport", dataIndex: "bugReport", key: "bugReport" },
    { title: "DDC", dataIndex: "DDC", key: "DDC" }
  ];

  const data = [];
  data.push({
    key: 1,
    role: "Screem",
    euclide: <Icon type="check" />,
    dashboard: <Icon type="minus" />,
    eFiles: <Icon type="check" />,
    bugReport: <Icon type="minus" />,
    DDC: <Icon type="check" />
  });
  data.push({
    key: 2,
    role: "Screem",
    euclide: <Icon type="minus" />,
    dashboard: <Icon type="minus" />,
    eFiles: <Icon type="minus" />,
    bugReport: <Icon type="minus" />,
    DDC: <Icon type="minus" />
  });
  data.push({
    key: 3,
    role: "Screem",
    euclide: <Icon type="minus" />,
    dashboard: <Icon type="minus" />,
    eFiles: <Icon type="minus" />,
    bugReport: <Icon type="minus" />,
    DDC: <Icon type="minus" />
  });

  return (
    <Portlet>
      <PortletBody>
        <div className="d-flex justify-content-end">
          <ModalAddRole />
        </div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={expandedRowRender}
          dataSource={data}
        />
      </PortletBody>
    </Portlet>
  );
}

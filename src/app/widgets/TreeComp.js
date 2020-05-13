import React, { useState } from "react";
import { Table, Icon, Switch } from "antd";
import { Portlet, PortletBody } from "../partials/content/Portlet";
import ModalAddRole from "./ModalAddRole";
import DatatableAuditConfig from "./DatatableAuditConfig";



export default () => {

  const [checkedKeysDDC, setCheckedKeysDDC] = useState([]);

  const expandedRowRender = () => {
    return (
      <DatatableAuditConfig/>
    );
  };

  const status = (keys, data) => {
    console.log(keys.length, data);
    if (keys.length >= data) {
      return <Icon type="check" style={{ color: "green" }} />;
    } else if (1 <= keys.length && keys.length < data) {
      return <Icon type="check" style={{ color: "orange" }} />;
    } else if (keys.length === 0) {
      return <Icon type="minus" style={{ color: "red" }} />;
    }
  };

  const columns = [
    { title: "Domain", dataIndex: "domain", key: "domain" },

    { title: "Audit", dataIndex: "Audit", key: "Audit" },
  ];

  const data = [];
  data.push({
    key: 1,
    domain: "AttachementFile",
    Audit: <Switch/>,
  });
  // data.push({
  //   key: 3,
  //   role: "Screem",
  //   euclide:status(checkedKeys,euclideData[0].children.length),
  //   dashboard: status(checkedKeysDashboard,dashboardData[0].children.length) ,
  //   eFiles: status(checkedKeysEFilesData,eFilesData[0].children.length),
  //   bugReport: status(checkedKeysBugReport,bugReportData[0].children.length),
  //   DDC: status(checkedKeysDDC,13)
  // });

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
          pagination={false}
        />
      </PortletBody>
    </Portlet>
  );
};

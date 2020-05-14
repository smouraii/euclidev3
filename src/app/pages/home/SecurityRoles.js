import React, { useState } from "react";
import { Table, Icon } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import ModalAddRole from "./../../widgets/ModalAddRole";
import TreeList from "../../widgets/Treelist";
import FullscreenButton from "../../widgets/FullscreenButton";

const euclideData = [
  {
    title: "Euclide",
    key: "euclide",
    children: [
      {
        title: "Lims",
        key: "Lims",
      },
      {
        title: "Mail Server",
        key: "MailServer",
      },
      {
        title: "DB Configuration",
        key: "DBConfiguration",
      },
      {
        title: "Security Roles",
        key: "SecurityRoles",
      },
      {
        title: "User Configuration",
        key: "UserConfiguration",
      },
      {
        title: "Audit Configuration",
        key: "Audit Configuration",
      },
      {
        title: "EFiles Configuration",
        key: "EFilesConfiguration",
      },
    ],
  },
];
const dashboardData = [
  {
    title: "Dashboard",
    key: "dashboard",
    children: [
      {
        title: "Request Per Status",
        key: "requestPerStatus",
      },
      {
        title: "Sample Per Request",
        key: "samplePerRequest",
      },
    ],
  },
];
const eFilesData = [
  {
    title: "eFiles Data",
    key: "eFilesData",
    children: [
      {
        title: "eFiles Client",
        key: "eFilesClient",
      },
    ],
  },
];
const bugReportData = [
  {
    title: "Bug Report",
    key: "bugReport",
    children: [
      {
        title: "Report List",
        key: "reportList",
      },
      {
        title: "Error Log",
        key: "errorLog",
      },
      {
        title: "Audti List",
        key: "AuditList",
      },
      {
        title: "Online Users",
        key: "onlineUsers",
      },
    ],
  },
];
const DDCData = [
  {
    title: "DDC",
    key: "DDC",
    children: [
      {
        title: "Analysis Request",
        key: "analysisRequest",
        children: [
          {
            title: "Request01",
            key: "request01",
          },
          {
            title: "List01",
            key: "list01",
          },
        ],
      },
      {
        title: "Analysis Request 2",
        key: "analysisRequest02",
        children: [
          {
            title: "Analysis Request Without RI",
            key: "analysisRequestWithoutRI",
          },
        ],
      },
      {
        title: "Adress",
        key: "Adress",
        children: [
          {
            title: "Adress Billing",
            key: "AdressBilling",
          },
          {
            title: "AdressReportTo",
            key: "AdressReportTo",
          },
          {
            title: "AdressList",
            key: "AdressList",
          },
        ],
      },
      {
        title: "Post Message",
        key: "PostMessage",
        children: [
          {
            title: "Post Message",
            key: "postMessage",
          },
          {
            title: "Message List",
            key: "MessageList",
          },
        ],
      },
    ],
  },
];

export default function SecurityRoles() {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [checkedKeysDashboard, setCheckedKeysDashboard] = useState([]);
  const [checkedKeysEFilesData, setCheckedKeysEFilesData] = useState([]);
  const [checkedKeysBugReport, setCheckedKeysBugReport] = useState([]);
  const [checkedKeysDDC, setCheckedKeysDDC] = useState([]);

  const [isFull, setIsFull] = React.useState(false);

  const expandedRowRender = () => {
    return (
      <TreeList
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        checkedKeysDashboard={checkedKeysDashboard}
        setCheckedKeysDashboard={setCheckedKeysDashboard}
        checkedKeysBugReport={checkedKeysBugReport}
        setCheckedKeysBugReport={setCheckedKeysBugReport}
        checkedKeysEFilesData={checkedKeysEFilesData}
        setCheckedKeysEFilesData={setCheckedKeysEFilesData}
        checkedKeysDDC={checkedKeysDDC}
        setCheckedKeysDDC={setCheckedKeysDDC}
        euclideData={euclideData}
        dashboardData={dashboardData}
        eFilesData={eFilesData}
        bugReportData={bugReportData}
        DDCData={DDCData}
      />
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
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Euclide", dataIndex: "euclide", key: "euclide" },
    { title: "Dashboard", dataIndex: "dashboard", key: "dashboard" },
    { title: "EFiles", dataIndex: "eFiles", key: "eFiles" },
    { title: "bugReport", dataIndex: "bugReport", key: "bugReport" },
    { title: "DDC", dataIndex: "DDC", key: "DDC" },
  ];

  const data = [];
  data.push({
    key: 1,
    role: "Administrateur",
    euclide: status(checkedKeys, euclideData[0].children.length),
    dashboard: status(checkedKeysDashboard, dashboardData[0].children.length),
    eFiles: status(checkedKeysEFilesData, eFilesData[0].children.length),
    bugReport: status(checkedKeysBugReport, bugReportData[0].children.length),
    DDC: status(checkedKeysDDC, 13),
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
    <PortletBody heightfluid={true}>
      <div className="d-flex justify-content-end">
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalAddRole />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      <FullscreenButton
        style={{ margin: 10 }}
        isFull={isFull}
        setIsFull={setIsFull}
        current={
          <PortletBody fit={true}>
            <Table
              style={{ backgroundColor: "white" }}
              className="components-table-demo-nested"
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={data}
              pagination={false}
            />
          </PortletBody>
        }
      />
    </PortletBody>
  );
}

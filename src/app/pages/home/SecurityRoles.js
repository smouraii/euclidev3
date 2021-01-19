import React, { useState, useEffect, useReducer } from "react";
import { Table, Icon, Tooltip, Tree } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import ModalAddRole from "./../../widgets/ModalAddRole";
import TreeList from "../../widgets/Treelist";
import FullscreenButton from "../../widgets/FullscreenButton";
import redaxios from "redaxios";

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

const ComponentTree = (props) => {
  const {component, checkedKeys, setCheckedKeys} = props
  const [expandedKeys, setExpandedKeys] = useState([])

  useEffect(() => {
    setExpandedKeys([
      component.key
    ])
  }, [component])

  return (
    <div className="col-xl-4">
      <Portlet
        className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
        fluidHeight={true}
      >
        <PortletHeader title={component.title} />
        <PortletBody>
          <Tree
            checkable
            expandedKeys={expandedKeys}
            treeData={[component]}
            onCheck={setCheckedKeys}
            checkedKeys= {checkedKeys}
          />
        </PortletBody>
      </Portlet>
    </div>
  )
};

const ExpandedRowRender = (props) => {
  const {record, expanded, components} = props;
  const [activeNodes, setActiveNodes] = useReducer((state, action) => {
    return {
      ...state,
      [action.key] : action.selectedKeys
    }
  },[]);
  

  useEffect(() => {
    components.forEach(
        (component) => setActiveNodes({
          key: component.key,
          selectedKeys: [
            ...(record.activeNodes.includes(component.key) ? [component.key] : []),
            ...component.children.filter(child => record.activeNodes.includes(child.key)).map(child => child.key)
          ]})
      )
  }, [components])

  return (
      expanded && <div className="row d-flex justify-content-center">
        {
          components.map( component => (
            <ComponentTree 
              key={component.key}
              component={component}
              setCheckedKeys={(selectedKeys) => setActiveNodes({key: component.key, selectedKeys})}
              checkedKeys={activeNodes[component.key]}
            />
          ))
        }
      </div>
    )
}


export default function SecurityRoles() {
  const [components, setComponents] = useState([
    ...euclideData,
    ...dashboardData,
    ...eFilesData,
    ...bugReportData,
    ...DDCData,
  ])
  const [roles, setRoles] = useState([]);

  // Get Roles list at component mount
  useEffect(() => {
    redaxios.get(
      process.env.REACT_APP_HOST + "/EuclideV2/api/admin/security/roles",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.ok) {
        setRoles(res.data.roles);
      }
    })
    .catch((error) => console.log("error", error));
  }, [])

  const status = (keys, data) => {
    if (keys >= data) {
      return <Icon type="check" style={{ color: "green" }} />;
    } else if (1 <= keys && keys < data) {
      return <Icon type="check" style={{ color: "orange" }} />;
    } else if (keys === 0) {
      return <Icon type="minus" style={{ color: "red" }} />;
    }
  };

  const columns = [
    { title: "Role", dataIndex: "description", key: "id" },
    { title: "Euclide", dataIndex: "Euclide", key: "Euclide", render: (data) => status(data, euclideData[0].children.length) },
    { title: "Dashboard", dataIndex: "Dashboard", key: "Dashboard", render: (data) => status(data, dashboardData[0].children.length) },
    { title: "EFiles", dataIndex: "eFiles", key: "eFiles", render: (data) => status(data, eFilesData[0].children.length) },
    { title: "BugReport", dataIndex: "BugReport", key: "BugReport", render: (data) => status(data, bugReportData[0].children.length) },
    { title: "DDC", dataIndex: "DDC", key: "DDC", render: (data) => status(data, DDCData[0].children.length) },
  ];

  return (
    <>
      <div className="col-xl-12 d-flex">
        <div style={{ margin: 5 }}>
          <Tooltip title='Add role'>
            {/* <Button size="large" onClick={() => this.fetch({search: this.state.search})}><Icon type="retweet" /></Button> */}
            <ModalAddRole />
          </Tooltip>
        </div>
      </div>
      
      <div className="col-xl-12">
        <Portlet
          className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
          fluidHeight={true}
        >
          <PortletBody>
            <Table
              style={{ backgroundColor: "white" }}
              className="components-table-demo-nested"
              columns={columns}
              expandedRowRender={(record, index, indent, expanded) => <ExpandedRowRender components={components} record={record} expanded={expanded}/>}
              dataSource={roles}
              pagination={false}
            />
          </PortletBody>
        </Portlet>
      </div>
    </>
  );
}

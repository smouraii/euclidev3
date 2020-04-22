import React, { useState } from "react";
import { Tree, Checkbox } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../partials/content/Portlet";

const { TreeNode } = Tree;
const euclideData = [
  {
    title: "Euclide",
    key: "euclide",
    children: [
      {
        title: "Lims",
        key: "Lims"
      },
      {
        title: "Mail Server",
        key: "Mail Server"
      },
      {
        title: "DB Configuration",
        key: "DB Configuration"
      },
      {
        title: "Security Roles",
        key: "Security Roles"
      },
      {
        title: "User Configuration",
        key: "User Configuration"
      },
      {
        title: "Audit Configuration",
        key: "Audit Configuration"
      },
      {
        title: "EFiles Configuration",
        key: "EFiles Configuration"
      }
    ]
  }
];
const dashboardData = [
    {
      title: "Dashboard",
      key: "dashboard",
      children: [
        {
          title: "Request Per Status",
          key: "requestPerStatus"
        },
        {
            title: "Sample Per Request",
            key: "samplePerRequest"
          },
      ]
    }
  ];
  const eFilesData = [
    {
      title: "eFiles Data",
      key: "eFilesData",
      children: [
        {
          title: "eFiles Client",
          key: "eFilesClient"
        },
      ]
    }
  ];
  const bugReportData = [
    {
      title: "Bug Report",
      key: "bugReport",
      children: [
        {
          title: "Report List",
          key: "reportList"
        },
        {
          title: "Error Log",
          key: "errorLog"
        },
        {
          title: "Audti List",
          key: "AuditList"
        },
        {
          title: "Online Users",
          key: "onlineUsers"
        },
      ]
    }
  ];
  const DDCData = [
    {
      title: "DDC",
      key: "DDC",
      children: [
        {
          title: "Analysis Request",
          key: "analysisRequest",
          children:[
              {
                  title:"Request01",
                  key:"request01",
              },
              {
                  title:"List01",
                  key:"list01",
              },
          ],
        },
        {
          title: "Analysis Request 2",
          key: "analysisRequest02",
          children:[
             { 
                 title:"Analysis Request Without RI",
                 key:"analysisRequestWithoutRI",
            }
          ]
        },
        {
          title: "Adress",
          key: "Adress",
          children:[
              {
                  title:"Adress Billing",
                  key:"AdressBilling",
              },
              {
                title:"AdressReportTo",
                key:"AdressReportTo",
            },
            {
                title:"AdressList",
                key:"AdressList",
            },
          ]
        },
        {
          title: "Post Message",
          key: "Post Message",
          children:[
              {
                  title:"Post Message",
                  key:"postMessage",
              },
              {
                title:"Message List",
                key:"MessageList",
            }
          ]
        },
      ]
    }
  ];

export default function TreeList() {
  const [expandedKeys, setExpandedKeys] = useState(['euclide','dashboard','eFilesData','bugReport','DDC']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <>
      <Portlet
        className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
        fluidHeight={true}
      >
        <PortletBody>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader title="Euclide" />
                <PortletBody>
                  <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={euclideData}
                  />
                </PortletBody>
              </Portlet>
            </div>
            <div className="col-xl-4">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader title="Dashboard" />
                <PortletBody>
                  <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={dashboardData}
                  />
                </PortletBody>
              </Portlet>
            </div>
            <div className="col-xl-4">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader title="eFiles" />
                <PortletBody>
                  <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={eFilesData}
                  />
                </PortletBody>
              </Portlet>
            </div>
            <div className="col-xl-4">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader title="Bug Report" />
                <PortletBody>
                  <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={bugReportData}
                  />
                </PortletBody>
              </Portlet>
            </div>
            <div className="col-xl-4">
              <Portlet
                className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
                fluidHeight={true}
              >
                <PortletHeader title="Dynamic Domain Class" />
                <PortletBody>
                  <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={DDCData}
                  />
                </PortletBody>
              </Portlet>
            </div>
          </div>
        </PortletBody>
      </Portlet>
    </>
  );
}

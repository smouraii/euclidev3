import React, { useState, useEffect, useReducer } from "react";
import { Table, Icon, Tooltip, Tree, Button } from "antd";
import {
  Portlet,
  PortletBody,
  PortletHeader,
} from "../../partials/content/Portlet";
import ModalAddRole from "./../../widgets/ModalAddRole";
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

const ComponentTree = (props) => {
  const {component, checkedKeys, setCheckedKeys, disable} = props

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
            defaultExpandAll={true}
            treeData={[component]}
            onCheck={setCheckedKeys}
            checkedKeys= {checkedKeys}
            disabled={disable}
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
  const [disable, setDisable] = useState(true)
  
  useEffect(() => {
    if (!expanded) {
      setDisable(true)
      components.forEach(
        (component) => setActiveNodes({
          key: component.key,
          selectedKeys: [
            ...(record.activeNodes.includes(component.key) ? [component.key] : []),
            ...component.children.filter(child => record.activeNodes.includes(child.key)).map(child => child.key)
          ]})
      )   
    }
  }, [expanded])

  console.log({components})

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
        <div className="col-xl-12 d-flex">
          <div style={{ marginBottom: 15 }}>
            <Button size="small" type={disable ? 'default' : 'primary'} onClick={() => disable ? setDisable(!disable) : setDisable(!disable)}><Icon type={disable ? 'edit' : 'save'} />{disable ? 'Edit' : 'Save'}</Button>
          </div>
        </div>
      
          {
            components.map( component => (
              <ComponentTree 
                key={component.key}
                component={component}
                setCheckedKeys={(selectedKeys) => setActiveNodes({key: component.key, selectedKeys})}
                checkedKeys={activeNodes[component.key]}
                disable={disable}
              />
            ))
          }
      </div>
    )
}

export default function SecurityRoles() {
  const [components, setComponents] = useState([
    ...euclideData,
  ])
  const [columns, setColumns] = useState([
    { title: "Role", dataIndex: "description", key: "id" },
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

  // Get DDC list at component mount
  useEffect(() => {
    redaxios.get(
      process.env.REACT_APP_HOST + "/EuclideV2/api/admin/security/components",
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
        console.log(res)

        setColumns([
          { title: "Role", dataIndex: "description", key: "id" },
          ...res.data.components.map(component => ({
            title: component.title,
            dataIndex: component.title,
            key: component.title,
            render: (data) => status(data, component.nodesCount)
          })),
        ])

        setComponents([
          ...res.data.components.map(component => ({
            title: component.title,
            key: component.title,
            children: component.children.map(child => ({
              title: child.title,
              key: child.title,
            }))
          })),
        ])
      }
    })
    .catch((error) => console.log("error", error));
  }, [])

  const status = (keys = 0, data) => {
    console.log({keys, data})
    if (keys >= data) {
      return <Icon type="check" style={{ color: "green" }} />;
    } else if (1 <= keys && keys < data) {
      return <Icon type="check" style={{ color: "orange" }} />;
    } else if (keys === 0) {
      return <Icon type="minus" style={{ color: "red" }} />;
    }
  };

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

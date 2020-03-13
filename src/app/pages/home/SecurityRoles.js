import React from 'react';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import ModalAddRole from './../../widgets/ModalAddRole'

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

export default function SecurityRoles() {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'Date', key: 'Date' },
      { title: 'Role', dataIndex: 'Role', key: 'Role' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        Date: '2014-12-24 23:12:00',
        Role: 'This is a Role',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Euclide', dataIndex: 'euclide', key: 'euclide' },
    { title: 'Dashboard', dataIndex: 'dashboard', key: 'dashboard' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'EFiles', dataIndex: 'eFiles', key: 'eFiles' },
    { title: 'bugReport', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'DDC', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      role: 'Screem',
      euclide: 'iOS',
      dEashboard: '10.3.4.5654',
      upgradeNum: 500,
      eFiles: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

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


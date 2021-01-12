import React, { useState } from "react";
import { Input, Icon, Button, Tooltip } from "antd";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import DatatableUserConfig from "../../widgets/DatatableUserConfiguration";
import ModalAddUser from "../../widgets/ModalAddUser";

export default function UserConfiguration() {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="col-xl-12 d-flex">
        <div style={{ margin: 5 }}>
          <Input.Search
            size="large"
            placeholder="Search"
            onSearch={setSearch}
            allowClear={true}
          />
        </div>
        <div style={{ margin: 5 }}>
          <Tooltip title='Refresh user list'>
            <Button size="large" onClick={() => console.log("refresh page")}><Icon type="retweet" /></Button>
          </Tooltip>
        </div>
        <div style={{ margin: 5 }}>
          <ModalAddUser />
        </div>
      </div>


      <div className="col-xl-12">
        <Portlet
          className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
          fluidHeight={true}
        >
          <PortletBody>
            <DatatableUserConfig search={search}/>
          </PortletBody>
        </Portlet>
      </div>
    </>
  );
}

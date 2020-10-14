import React, { useState } from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import reqwest from "reqwest";
import FullScreenButton from "../../widgets/FullscreenButton";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalUpload from "../../widgets/ModalUpload";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/DatatableFolderList";
import { Button, Icon, Input } from "antd";
import Highlighter from "react-highlight-words";

export default function FolderList() {
 

  return (
    <>
      <div className="d-flex justify-content-end">
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      <div className="row row-no-padding row-col-separator-x1">
        <div className="col-xl-12">
          <Portlet>
            <PortletBody fit={true}>
              <Datatable />
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}

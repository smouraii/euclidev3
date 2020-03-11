import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import Datatables from "../../widgets/Datatables";
import ModalUpload from "../../widgets/ModalUpload";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalDelete from "../../widgets/ModalDelete";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/Datatable";

export default function Efiles() {
  return (
    <>
      <Portlet>
        <PortletBody>
          <div
            className="d-flex justify-content-end"

          >
            <ModalAddFloder />
            <ModalUpload />
            <ModalDelete />
            <RefreshButton />
          </div>
          <div className="col-md-12" style={{margin:10}}>
            <Datatable />
          </div>
        </PortletBody>
      </Portlet>
    </>
  );
}

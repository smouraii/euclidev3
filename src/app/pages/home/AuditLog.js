import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import Datatables from "../../widgets/DatatablePrimeReact";
import ModalForm from "../../widgets/ModalForm";
import RefreshButton from "../../widgets/RefreshButton";

export default function AuditLog() {
  return (
    <>
      <div className="row d-flex justify-content-end">
        
        <div style={{margin:5}}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalForm />
            </PortletBody>
          </Portlet>
          </div>
          <div style={{margin:5}}>
          <Portlet>
            <PortletBody fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>
        <div className="col-md-12">
        <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
          <PortletBody fit={true}>
            <Datatables />
          </PortletBody>
        </Portlet>
      </div>
    </div>
    </>
  );
}

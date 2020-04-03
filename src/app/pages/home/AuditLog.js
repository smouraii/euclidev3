import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalForm from "../../widgets/ModalForm";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/DatatableAntd";

export default function AuditLog() {
  return (
    <>
      <div className="row d-flex justify-content-end">

                <div style={{margin:5}}>
          <Portlet>
            <PortletBody fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>  
        <div style={{margin:5}}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalForm />
            </PortletBody>
          </Portlet>
          </div>

        <div className="col-md-12">
        <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
          <PortletBody fit={true}>
            <Datatable />
          </PortletBody>
        </Portlet>
      </div>
    </div>
    </>
  );
}

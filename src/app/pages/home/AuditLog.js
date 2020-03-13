import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import Datatables from "../../widgets/DatatablePrimeReact";
import ModalForm from "../../widgets/ModalForm";

export default function AuditLog() {
  return (
    <>
      <div className="row d-flex justify-content-end">
        <div>
          <Portlet className="kt-portlet--height-fluid">
            <PortletBody fluidheight={true} fit={true}>
              <ModalForm />
            </PortletBody>
          </Portlet>
        </div>
        <div className="col-md-12">
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
            <PortletBody fluidheight={true}>
              <Datatables />
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}

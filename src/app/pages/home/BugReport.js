import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalForm from "../../widgets/ModalForm";
import Datatable from "../../widgets/DatatableAntd";
import RefreshButton from "../../widgets/RefreshButton";

export default function BugReport() {
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
      <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
                <ModalForm />
              </PortletBody>
            </Portlet>
            </div>
            </div>

          <div className="col-md-12">
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-dark" fluidHeight={true} >
            <PortletBody fit={true}>
              <Datatable />
            </PortletBody>
          </Portlet>
        </div>
     
    </>
  );
}

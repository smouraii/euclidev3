import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import Datatables from "../../widgets/DatatablePrimeReact";
import ModalForm from "../../widgets/ModalForm";

export default function BugReport() {
  return (
    <>
      <div className="row d-flex justify-content-end">
        
          <div>
            <Portlet>
              <PortletBody fit={true}>
                <ModalForm />
              </PortletBody>
            </Portlet>
          </div>
          <div className="col-md-12">
          <Portlet>
            <PortletBody fit={true}>
              <Datatables />
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}

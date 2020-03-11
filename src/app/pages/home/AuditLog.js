import React from "react";
import {
  Portlet,
  PortletBody,
} from "../../partials/content/Portlet";
import Datatables from "../../widgets/Datatables";
import ModalForm from "../../widgets/ModalForm";

export default function AuditLog() {

  return (
    <>
    <Portlet>
        <PortletBody fit={true}>
          <div className="row row-no-padding row-col-separator-x1">
            
            <div className="col-xl-12">
            <div
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "20px"
                }}
              >
                <ModalForm />
              </div>
              <Datatables
              />
            </div>
          </div>
        </PortletBody>
      </Portlet>

    </>
   );
  }






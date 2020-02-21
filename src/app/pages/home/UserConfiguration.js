import React from "react";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
import Datatable from "../../widgets/Datatables";
import datatableData from "./data/datatableData.json";
import ModalForm from "../../widgets/ModalForm";

export default function UserConfiguration() {
  return (
    <>
    <Portlet>
        <PortletBody >
          <div className="row row-no-padding row-col-separator-x1" >
            
            <div className="col-xl-12" >
            <div
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginTop: "20px"
                }}
              >
                <ModalForm />
              </div>
              <Datatable
                title="A Datatable "
                data={datatableData}
                desc="This is a Datatable"
              />
            </div>
          </div>
        </PortletBody>
      </Portlet>

    </>
   );
  }






import React from "react";
import {
  Portlet,
  PortletBody,
} from "../../partials/content/Portlet";
import Datatable from "../../widgets/Datatables"
import datatableData from "./data/datatableData.json"
import ModalForm from "../../widgets/ModalForm";

export default function BugReport() {

  return (
    <>
    <Portlet>
        <PortletBody fit={true}>
        
          <div className="row row-no-padding row-col-separator-x1">
          <div>
            <ModalForm/>
            </div>
            <div className="col-xl-12">
            
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





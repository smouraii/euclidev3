import React from "react";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
import Datatable from "../../widgets/Datatables"
import datatableData from "./data/datatableData.json"

export default function UserConfiguration() {
  return (
    <>
    <Portlet>
        <PortletBody >
          <div className="row row-no-padding row-col-separator-x1" >
            
            <div className="col-xl-12" >
              <Datatable
              style={{margin:50}}
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






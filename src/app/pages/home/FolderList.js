import React, { useMemo } from "react";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
import Datatable from "../../widgets/Datatables"
import datatableData from "./data/datatableData.json"

export default function FolderList() {
  return (
    <>
    <Portlet>
        <PortletBody fit={true}>
          <div className="row row-no-padding row-col-separator-x1">
            
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






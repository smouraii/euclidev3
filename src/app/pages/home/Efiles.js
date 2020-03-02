import React from "react";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
import Datatable from "../../widgets/Datatables";
import datatableData from "./data/datatableData.json";
import ModalUpload from "../../widgets/ModalUpload";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalDelete from "../../widgets/ModalDelete";
import RefreshButton from "../../widgets/RefreshButton";


export default function UserConfiguration() {
  return (
    <>
    <Portlet>
        <PortletBody >
          <div className="d-flex justify-content-end" style={{
            marginBottom:-30
            }}>
            
                <ModalAddFloder />
                <ModalUpload />
                <ModalDelete />
               <RefreshButton />
               
                </div>

                <Datatable
                title="A Datatable "
                data={datatableData}
                desc="This is a Datatable"
              />
           
        </PortletBody>
      </Portlet>

    </>
   );
  }






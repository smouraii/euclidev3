import React from "react";
import {
  Portlet,
  PortletBody
} from "../../partials/content/Portlet";
import Datatables from "../../widgets/Datatables";
import ModalForm from "../../widgets/ModalForm";
import ModalChangeRole from "../../widgets/ModalChangeRole";
import ModalActivate from "../../widgets/ModalActivate";
import ModalDisableUser from "../../widgets/ModalDisableUser";
import ModalSuspendUser from "../../widgets/ModalSuspendUser";
import ModalAllocateAddresses from "../../widgets/ModalAllocateAddresses";
import ModalChangePassword from "../../widgets/ModalChangePassword";
import RefreshButton from "../../widgets/RefreshButton";
import FullscreenButton from "../../widgets/FullscreenButton";


export default function UserConfiguration() {
  return (
    <>
    <Portlet>
        <PortletBody >
          <div className="d-flex justify-content-end" style={{
            marginBottom:-30
            }}>
            
                <RefreshButton />
                <ModalForm />
                <ModalChangeRole />
                <ModalActivate />
                <ModalDisableUser />
                <ModalSuspendUser />
                <ModalAllocateAddresses />
                <ModalChangePassword />
               
                </div>

                <Datatables
              />
           
        </PortletBody>
      </Portlet>

    </>
   );
  }






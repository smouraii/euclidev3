import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalChangeRole from "../../widgets/ModalChangeRole";
import ModalActivate from "../../widgets/ModalActivate";
import ModalDisableUser from "../../widgets/ModalDisableUser";
import ModalSuspendUser from "../../widgets/ModalSuspendUser";
import ModalAllocateAddresses from "../../widgets/ModalAllocateAddresses";
import ModalChangePassword from "../../widgets/ModalChangePassword";
import RefreshButton from "../../widgets/RefreshButton";
import FullscreenButton from "../../widgets/FullscreenButton";
import DatatableUserConfig from "../../widgets/DatatableUserConfiguration";
import ModalAddUser from "../../widgets/ModalAddUser";

export default function UserConfiguration() {
  const [isFull, setIsFull] = React.useState(false);

  return (
    <>
      <div className="d-flex justify-content-end">
        <div style={{ margin: 5 }}>
          <RefreshButton />
        </div>
        <div style={{ margin: 5 }}>
          <ModalAddUser />
        </div>
        <div style={{ margin: 5 }}>
          <ModalChangeRole />
        </div>
        <div style={{ margin: 5 }}>
          <ModalActivate />
        </div>
        <div style={{ margin: 5 }}>
          <ModalDisableUser />
        </div>
        <div style={{ margin: 5 }}>
          <ModalSuspendUser />
        </div>
        <div style={{ margin: 5 }}>
          <ModalAllocateAddresses />
        </div>
        <div style={{ margin: 5 }}>
          <ModalChangePassword />
        </div>
      </div>


      <div className="col-xl-12">
        <Portlet
          className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
          fluidHeight={true}
        >
          <PortletBody>
            <DatatableUserConfig />
          </PortletBody>
        </Portlet>
      </div>
    </>
  );
}

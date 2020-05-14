import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalForm from "../../widgets/ModalForm";
import ModalChangeRole from "../../widgets/ModalChangeRole";
import ModalActivate from "../../widgets/ModalActivate";
import ModalDisableUser from "../../widgets/ModalDisableUser";
import ModalSuspendUser from "../../widgets/ModalSuspendUser";
import ModalAllocateAddresses from "../../widgets/ModalAllocateAddresses";
import ModalChangePassword from "../../widgets/ModalChangePassword";
import RefreshButton from "../../widgets/RefreshButton";
import FullscreenButton from "../../widgets/FullscreenButton";
import Datatable from "../../widgets/DatatableAntd";

export default function UserConfiguration() {
  const [isFull, setIsFull] = React.useState(false);

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
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalChangeRole />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalActivate />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalDisableUser />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalSuspendUser />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalAllocateAddresses />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalChangePassword />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      {/* <FullscreenButton
current= {<> */}
      <div className="col-xl-12">
        <Portlet
          className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
          fluidHeight={true}
        >
          <FullscreenButton
            style={{ margin: 10 }}
            isFull={isFull}
            setIsFull={setIsFull}
            current={
              <PortletBody fit={true}>
                <Datatable />
              </PortletBody>
            }
          />
        </Portlet>
      </div>
      {/* </>
        } /> */}
    </>
  );
}

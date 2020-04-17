import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalForm from "../../widgets/ModalForm";
import Datatable from "../../widgets/DatatableAntd";
import RefreshButton from "../../widgets/RefreshButton";
import EditableFormTable from "../../widgets/DatatableEditable";
import FullscreenButton from "../../widgets/FullscreenButton";

export default function BugReport() {
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
      </div>

      <FullscreenButton
        isFull={isFull}
        setIsFull={setIsFull}
        current={
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Portlet
              className="kt-portlet--height-fluid kt-portlet--border-bottom-dark"
              fluidHeight={true}
            >
              <PortletBody fit={true}>
                <EditableFormTable isFull={isFull} />
              </PortletBody>
            </Portlet>
          </div>
        }
      />
    </>
  );
}

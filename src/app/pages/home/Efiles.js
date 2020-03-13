import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import Datatables from "../../widgets/DatatablePrimeReact";
import ModalUpload from "../../widgets/ModalUpload";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalDelete from "../../widgets/ModalDelete";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/DatatableAntd";

export default function Efiles() {
  return (
    <>
      <div className="d-flex justify-content-end">
        <div>
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
            <PortletBody fluidheight={true} fit={true}>
              <ModalAddFloder />
            </PortletBody>
          </Portlet>
        </div>
        <div>
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
            <PortletBody fluidheight={true} fit={true}>
              <ModalUpload />
            </PortletBody>
          </Portlet>
        </div>
        <div>
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
            <PortletBody fluidheight={true} fit={true}>
              <ModalDelete />
            </PortletBody>
          </Portlet>
        </div>
        <div>
          <Portlet className="kt-portlet--height-fluid kt-portlet--border-bottom-brand">
            <PortletBody fluidheight={true} fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      <div className="row">
        <Portlet>
          <PortletBody fluid={true}>
            <div className="col-md-12">
              <Datatable />
            </div>
          </PortletBody>
        </Portlet>
      </div>
    </>
  );
}

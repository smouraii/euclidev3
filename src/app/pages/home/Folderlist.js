import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import reqwest from "reqwest";
import FullScreenButton from "../../widgets/FullscreenButton";
import ModalAddFloder from "../../widgets/ModalAddFolder";
import ModalUpload from "../../widgets/ModalUpload";
import RefreshButton from "../../widgets/RefreshButton";
import Datatable from "../../widgets/DatatableAntd";


export default function FolderList() {
  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      data: {
        results: 30,
        ...params
      }
    });
  };
  //  const search = myInput.on( 'keyup', function () {
  //     Datatable.search( this.value ).draw();
  // } );
  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  return (
    <>
      <div className="d-flex justify-content-end">
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalAddFloder />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <ModalUpload />
            </PortletBody>
          </Portlet>
        </div>
        <div style={{ margin: 5 }}>
          <Portlet>
            <PortletBody fit={true}>
              <RefreshButton />
            </PortletBody>
          </Portlet>
        </div>
      </div>

      <div className="row row-no-padding row-col-separator-x1">
        <div className="col-xl-12">
          <Portlet>
            <PortletBody fit={true}>
              <Datatable/>
            </PortletBody>
          </Portlet>
        </div>
      </div>
    </>
  );
}

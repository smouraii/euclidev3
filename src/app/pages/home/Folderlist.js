import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import ModalForm from "../../widgets/ModalForm";
import reqwest from 'reqwest';
import FullScreenButton from "../../widgets/FullscreenButton";
import { Button, Input } from "antd";

import QueryBuilder from "../../widgets/QueryBuilder";
import MaterialTableDemo from "../../widgets/DatatableTest";




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
    })
  }
//  const search = myInput.on( 'keyup', function () {
//     Datatable.search( this.value ).draw();
// } );
  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  return (
    <>
      <Portlet>
        <PortletBody fit={true}>
          <div className="row row-no-padding row-col-separator-x1">
            <div className="col-xl-12">
              <div
                style={{
                  margin: "20px"
                }}
              >
              
                <ModalForm />
                <div className="col-xl-6">
              
              </div>
                 </div>
                 
                      <MaterialTableDemo/>       
             
            </div>
          </div>
        </PortletBody>
      </Portlet>
    </>
  );
}

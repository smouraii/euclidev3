import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablesTest = props => {
  const data =  props.data;

  return (
    <div style={{ margin: 20 }}>
      <MDBDataTable striped bordered hover data={data} />
    </div>
  );
};

export default DatatablesTest;

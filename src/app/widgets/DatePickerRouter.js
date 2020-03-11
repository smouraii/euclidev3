import React from 'react';
import DatePickerComp from './DatePicker';
import { withRouter } from 'react-router-dom';


 function DatePickerRouter(props) {
    return(
        <>
        {props.match.path === "/dashboard" && (
          <DatePickerComp/>
        )}
        </>
    );
}
export default withRouter(DatePickerRouter);
import React from "react";
import { withFormsy } from '@sdv/formsy-react';
 
class FormBuilderComp extends React.Component {
 
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);
    }
 
    render() {
 
        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        const className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null;
    
        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const errorMessage = this.props.getErrorMessage();
    
        return (
            <div className={className}>
                <input type="text" onChange={this.changeValue} value={this.props.getValue()}/>
                <span>{errorMessage}</span>
            </div>
        );
    }
}
 
export default withFormsy(FormBuilderComp)
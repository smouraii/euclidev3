import React from 'react';
import { FormsyForm } from '@sdv/formsy-react';
import FormBuilderComp from '../../widgets/FormBuilder'
  
export default class FormBuilderPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canSubmit: false
        }
    }
 
    enableButton = () => {
        this.setState({
            canSubmit: true
        })
    }
      
    disableButton = () => {
        this.setState({
            canSubmit: false
        })
    }
        
    submit = (model) => {
        someDep.saveEmail(model.email);
    }
        
    render() {
        return (
            <FormsyForm onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                <FormBuilderComp name="email" validations="isEmail" validationError="This is not a valid email" required/>
                <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
            </FormsyForm>
        );
    }
}
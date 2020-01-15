import React from 'react';
import FormComponent from '../form/FormComponent'
import '../form/form.css'

const Register = (props) => {
  return (
    <React.Fragment>
      <h4>Register</h4>
      {props.isEmpty && <span style={{ color: "red" }}>{"Please fill in all fields"}</span>}

      <FormComponent formClass='form register-form' InputFields={props.formFields} inputClass='input' BtnClass={'btn btn-info'} BtnType={"submit"} BtnTitle={"Register"} handleChange={props.handleChange} handleSubmit={props.handleSubmit} isSubmitBtn />

    </React.Fragment>
  );
}
export default Register;

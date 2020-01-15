import React from 'react';
import FormComponent from '../form/FormComponent';
import '../form/form.css'

const Login = (props) => {

  const userid = localStorage.getItem('UserID');

  console.log(userid);
  return (
    <React.Fragment>
      <h4>Login</h4>
      {props.isEmpty && <span style={{ color: "red" }}>{"Invalid Input"}</span>}
      {props.isError && <span style={{ color: "red" }}>{"User not Found"}</span>}
      <FormComponent formClass='form login-form' InputFields={props.LoginFields} inputClass='input' BtnClass={'btn btn-info'} BtnType={"submit"} BtnTitle={"Login"} handleChange={props.handleChange} handleSubmit={props.handleSubmit} isSubmitBtn />
    </React.Fragment>
  );
}
export default Login;
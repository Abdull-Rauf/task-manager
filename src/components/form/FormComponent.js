import React from 'react';
import '../form/form.css'


const FormComponent = props => {
  return (
    <form onSubmit={props.handleSubmit} className={props.formClass}>
      {props.InputFields.map((field, index) => {

        return (

          <input value={props.inputValue}
            onChange={props.handleChange}
            className={props.inputClass}
            size={field.size}
            type={field.inputType}
            name={field.inputName}
            placeholder={field.placeholder}
            key={index} />

        )

      })
      }
      {props.isSubmitBtn && <button className={props.BtnClass} type={props.BtnType} >{props.BtnTitle}</button>}

    </form >
  );
}

export default FormComponent;
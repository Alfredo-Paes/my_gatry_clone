import React from 'react';
import { useField } from 'formik';
import './FormField.css';


const FormField = ({ name, id, label, ...restProps }) => {

    const [ field, meta ] = useField({name, ...restProps});

    return (
        <>
            {label && (
                <label 
                    className="form-field__label" 
                    htmlFor={id ?? name}
                >
                    {label}
                </label>
            )}
            <input 
                {...field}
                className={`form-field__input ${meta.error && 'form-field__input--has-error'}`}  
                id={id ?? name}
                name={name}
            />
            {meta.error && meta.touched ? (
                <span className="form-field__error-message">{meta.error}</span>
            ) : null}
        </>
        
    );

}

export default FormField;
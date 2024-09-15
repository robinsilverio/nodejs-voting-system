import { adminLoginForm } from "./validator-modules/admin-login-form";
import { votersRegisterForm } from "./validator-modules/voters-register-form";

/* eslint-disable */
const validators = {
    votersRegisterForm,
    adminLoginForm
}

export const validateInputs = (paramForms) => {    

    let errors = [];


    Object.keys(paramForms).forEach(paramForm => {
        
        const form = paramForms[paramForm];
        const formValidator = validators[paramForm];

        form.inputFields.forEach(inputField => {
            
            const fieldValidator = formValidator.fields[inputField.fieldName];

            if (fieldValidator) {
                const errorMessage = fieldValidator(inputField.value);
                if (errorMessage) {
                    errors.push(errorMessage); 
                }
            }
        });
        
    })

    return errors;
}
import { adminLoginForm } from "./validator-modules/admin-login-form-validator.js";
import { electionForm } from "./validator-modules/election-form-validator.js";
import { votersRegisterForm } from "./validator-modules/voters-register-form-validator.js";

/* eslint-disable */
const validators = {
    votersRegisterForm,
    adminLoginForm,
    electionForm
}

export const validateInputs = (paramForms) => {    

    let errors = [];


    Object.keys(paramForms).forEach(paramForm => {
        
        const form = paramForms[paramForm];
        const formValidator = validators[paramForm];

        // This is only for checking if election enddate is not previous of equal to election startdate
        const startDateValue = form.inputFields.find(inputField => inputField.name === 'election_startdate')?.value;

        form.inputFields.forEach(inputField => {
            
            const fieldValidator = formValidator.fields[inputField.name];

            if (fieldValidator) {
                const errorMessage = fieldValidator(inputField.value, startDateValue);
                if (errorMessage) {
                    errors.push(errorMessage); 
                }
            }
        });
            
    });

    return errors;
}
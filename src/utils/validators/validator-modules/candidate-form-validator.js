import { regex } from "@/enums/regex";

export const candidateForm = {
    validationMethods: {
        isInputEmpty: (paramInput) => paramInput == null || paramInput == undefined || paramInput === '',
        isInputValid: (paramInput, paramType) => regex.ALPHA_NUMERIC_SPACE.test(paramInput)
    },
    fields: {
        "candidate_name": (paramValue) => {
            if (candidateForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Candidate name is required.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramValue)) {
                return 'This is an invalid candidate name.';
            }
            return;
        },
        "party_filiation": (paramValue) => {
            if (candidateForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Party affiliation is required.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramValue)) {
                return 'This is an invalid party affiliation.';
            }
            return;
        },
        "runs_for": (paramValue) => {
            if (candidateForm.validationMethods.isInputEmpty(paramValue)) {
                return 'You must specify what the candidate is running for.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramValue)) {
                return 'This is an invalid input for what the candidate is running for.';
            }
            return;
        },
        "participates_in": (paramValue) => {
            if (!candidateForm.validationMethods.isInputValid(paramValue)) {
                return 'This is an invalid input for participation.';
            }
            return;
        }
    }
}
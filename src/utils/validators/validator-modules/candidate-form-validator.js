import { regex } from "@/enums/regex";

export const candidateForm = {
    validationMethods: {
        isInputEmpty: (paramInput) => paramInput == null || paramInput == undefined || paramInput === '',
        isInputValid: (paramInput, paramType) => regex.ALPHA_NUMERIC_SPACE.test(paramInput),
        isToParticipateElectionEmpty: (paramElectionList) => paramElectionList.length < 1
    },
    fields: {
        "candidate_name": (paramInputField) => {
            if (candidateForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Candidate name is required.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramInputField.value)) {
                return 'This is an invalid candidate name.';
            }
            return;
        },
        "party_filiation": (paramInputField) => {
            if (candidateForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Party affiliation is required.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramInputField.value)) {
                return 'This is an invalid party affiliation.';
            }
            return;
        },
        "runs_for": (paramInputField) => {
            if (candidateForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'You must specify what the candidate is running for.';
            }
            if (!candidateForm.validationMethods.isInputValid(paramInputField.value)) {
                return 'This is an invalid input for what the candidate is running for.';
            }
            return;
        },
        "participates_in": (paramInputField) => {
            if (candidateForm.validationMethods.isToParticipateElectionEmpty(paramInputField.list)) {
                return 'It is required for a candidate to participate at least one election';
            }
            return;
        }
    }
}
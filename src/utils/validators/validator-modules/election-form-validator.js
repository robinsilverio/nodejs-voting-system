import { regex } from "@/enums/regex";

export const electionForm = {
    validationMethods: {
        isValidOption: (paramInput) => paramInput !== 'Selecteer een optie',
        isElectionDescriptionValid: (paramInput) => paramInput.length <= 500,
        isElectionNameValid: (paramInput) => regex.ALPHA_NUMERIC_SPACE.test(paramInput),
        isInputEmpty: (paramInput) => paramInput == null || paramInput == undefined  || paramInput == '',
        isDateAfterCurrentDate: (inputDate, currentDate) => inputDate >= currentDate
    },
    fields: {
        "election_name" : (paramInputField, customValueForComparison) => {
            
            if (electionForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om verkiezingsnaam in te voeren.';
            }
            if (!electionForm.validationMethods.isElectionNameValid(paramInputField.value)) {
                return 'Dit is een ongeldige verkiezingsnaam.';
            }
            return;
        },
        "election_description" : (paramInputField, customValueForComparison) => {

            if (electionForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om een beschrijving van de verkiezing in te voeren.';
            }
            if (!electionForm.validationMethods.isElectionDescriptionValid(paramInputField.value)) {
                return 'De beschrijving van de verkiezing mag niet langer zijn dan 500';
            }

            return;
        },
        "election_type" : (paramInputField, customValueForComparison) => {

            if (electionForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om een verkiezings type te selecteren.';
            }
            if (!electionForm.validationMethods.isValidOption(paramInputField.value)) {
                return 'Selecteer een geldige verkiezings type.';
            }
            return;
        },
        "election_startdate" : (paramInputField, customValueForComparison) => {

            if (electionForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om een startdatum van de verkiezing in te voeren.';
            }

            const inputDate = new Date(paramInputField.value);
            const currentDate = new Date();

            if (!electionForm.validationMethods.isDateAfterCurrentDate(inputDate, currentDate)) {
                return 'De startdatum van de verkiezing mag niet eerder zijn dan vandaag.';
            }
            return;
        },
        "election_enddate" : (paramInputField, customValueForComparison) => {
            if (electionForm.validationMethods.isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om een einddatum van de verkiezing in te voeren.';
            }
            if (!electionForm.validationMethods.isDateAfterCurrentDate(new Date(paramInputField.value), new Date(customValueForComparison))) {
                return  'De einddatum van de verkiezing mag niet eerder zijn dan de startdatum.';
            }
            return;
        }
    }
}
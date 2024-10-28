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
        "election_name" : (paramValue, customValue) => {
            
            if (electionForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Het is vereist om verkiezingsnaam in te voeren.';
            }
            if (!electionForm.validationMethods.isElectionNameValid(paramValue)) {
                return 'Dit is een ongeldige verkiezingsnaam.';
            }
            return;
        },
        "election_description" : (paramValue, customValue) => {

            if (electionForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Het is vereist om een beschrijving van de verkiezing in te voeren.';
            }
            if (!electionForm.validationMethods.isElectionDescriptionValid(paramValue)) {
                return 'De beschrijving van de verkiezing mag niet langer zijn dan 500';
            }

            return;
        },
        "election_type" : (paramValue, customValue) => {

            if (electionForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Het is vereist om een verkiezings type te selecteren.';
            }
            if (!electionForm.validationMethods.isValidOption(paramValue)) {
                return 'Selecteer een geldige verkiezings type.';
            }
            return;
        },
        "election_startdate" : (paramValue, customValue) => {

            if (electionForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Het is vereist om een startdatum van de verkiezing in te voeren.';
            }

            const inputDate = new Date(paramValue);
            const currentDate = new Date();

            if (!electionForm.validationMethods.isDateAfterCurrentDate(inputDate, currentDate)) {
                return 'De startdatum van de verkiezing mag niet eerder zijn dan vandaag.';
            }
            return;
        },
        "election_enddate" : (paramValue, customValueForComparison) => {
            if (electionForm.validationMethods.isInputEmpty(paramValue)) {
                return 'Het is vereist om een einddatum van de verkiezing in te voeren.';
            }
            if (!electionForm.validationMethods.isDateAfterCurrentDate(new Date(paramValue), new Date(customValueForComparison))) {
                return  'De einddatum van de verkiezing mag niet eerder zijn dan de startdatum.';
            }
            return;
        }
    }
}
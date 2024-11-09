import { regex } from "@/enums/regex";

export const adminLoginForm = {
    fields: {
        'username' : (paramInputField) => {

            const isInputEmpty = (paramInput) => paramInput == null || paramInput == undefined || paramInput == '';
            const isInputAlphanumeric = (paramInput) => regex.ALPHA_NUMERIC.test(paramInput);

            if (isInputEmpty(paramInputField.value)){
                return 'Het is vereist om een gebruikersnaam toe te voegen.';
            }
            if (!isInputAlphanumeric(paramInputField.value)) {
                return 'Dit gebruikersnaam is ongeldig. Het moet minstens 6 en maximaal 16 alfanumerische karakters bevatten.'
            }
            return;
        }
    }
};
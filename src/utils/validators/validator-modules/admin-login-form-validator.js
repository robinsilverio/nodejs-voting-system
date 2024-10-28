import { regex } from "@/enums/regex";

export const adminLoginForm = {
    fields: {
        'username' : (paramValue) => {

            const isInputEmpty = (paramInput) => paramInput == null || paramInput == undefined || paramInput == '';
            const isInputAlphanumeric = (paramInput) => regex.ALPHA_NUMERIC.test(paramInput);

            if (isInputEmpty(paramValue)){
                return 'Het is vereist om een gebruikersnaam toe te voegen.';
            }
            if (!isInputAlphanumeric(paramValue)) {
                return 'Dit gebruikersnaam is ongeldig. Het moet minstens 6 en maximaal 16 alfanumerische karakters bevatten.'
            }
            return;
        }
    }
};
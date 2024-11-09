import { regex } from "@/enums/regex";

export const votersRegisterForm = {
    fields: {
        'token': (paramInputField) => {

            const isInputEmpty = (paramInput) => paramInput == null || paramInput == undefined || paramInput == '';
            const isTokenValid = (paramInput) => regex.TOKEN_REGEX.test(paramInput);


            if (isInputEmpty(paramInputField.value)) {
                return 'Het is vereist om een stemtoken in te voeren.';
            }
            if (!isTokenValid(paramInputField.value)) {
                return 'De token moet in format van XXXX XXXX XXXX XXXX zijn, bijvoorbeeld: ABCD EFGH IJKL MNOP';
            }
            return;
        }
    }
}
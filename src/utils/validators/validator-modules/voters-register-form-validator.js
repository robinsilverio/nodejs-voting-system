import { regex } from "@/enums/regex";

export const votersRegisterForm = {
    fields: {
        'token': (paramValue) => {

            const isInputEmpty = (paramInput) => paramInput == null || paramInput == undefined || paramInput == '';
            const isTokenValid = (paramInput) => regex.TOKEN_REGEX.test(paramInput);


            if (isInputEmpty(paramValue)) {
                return 'Het is vereist om een stemtoken in te voeren.';
            }
            if (!isTokenValid(paramValue)) {
                return 'De token moet in format van XXXX XXXX XXXX XXXX zijn, bijvoorbeeld: ABCD EFGH IJKL MNOP';
            }
            return;
        }
    }
}
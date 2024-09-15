const usernameRegex = /^[0-9A-Za-z]{6,16}$/;

const validator = {
    'token' : (paramValue) => {
        if (paramValue == null || paramValue == undefined || paramValue == '') {
            return 'Het is vereist om een stemtoken in te voeren.';
        }
        return;
    },
    'username' : (paramValue) => {
        if (paramValue == null || paramValue == undefined || paramValue == ''){
            return 'Het is vereist om een gebruikersnaam toe te voegen.';
        }
        if (!usernameRegex.test(paramValue)) {
            return 'Dit gebruikersnaam is ongeldig. Het moet minstens 6 en maximaal 16 alfanumerische karakters bevatten.'
        }
        return;
    }
}

export const validateForm = (paramForm) => {

    let errors = [];

    paramForm.inputFields.forEach(inputField => {
        if (inputField.fieldName !== 'password')
            errors.push(validator[inputField.fieldName](inputField.value));
    });

    return errors;
}
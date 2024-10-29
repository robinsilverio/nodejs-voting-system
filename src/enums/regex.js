export const regex = {
    ALPHA_NUMERIC: new RegExp(/^[0-9A-Za-z]{6,16}$/),
    ALPHA_NUMERIC_SPACE: new RegExp(/^([0-9a-zA-ZÀ-ÿ' ]+)?$/),
    DATE: new RegExp("^(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/\\d{4}$"),
    TOKEN_REGEX: new RegExp(/^([A-Z0-9]{4,5} ){3}[A-Z0-9]{4,5}$/)
}
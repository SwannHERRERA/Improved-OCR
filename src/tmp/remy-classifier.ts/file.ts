enum ValidatorsError {
    ILLEGAL,
    ERROR,
}

const ErrorCodeSuffix = new Map([
    [ValidatorsError.ILLEGAL, 'ILL'],
    [ValidatorsError.ERROR, 'ERR'],
]);

const validators = new Map([
    [ValidatorsError.ILLEGAL, illegalValidator],
    [ValidatorsError.ERROR, errorValidator],
]);

export class CodeToResult2 {
    // eslint-disable-next-line no-unused-vars
    private validators: Map<ValidatorsError, (code: string) => boolean>;
    // eslint-disable-next-line no-unused-vars
    private errorCodeSuffix: Map<ValidatorsError, string>;

    constructor(
        validators: Map<ValidatorsError, (code: string) => boolean>,
        errorCodeSuffix: Map<ValidatorsError, string>
    ) {
        this.validators = validators;
        this.errorCodeSuffix = errorCodeSuffix;
    }

    format(code: string): string {
        const errorValidatorn = this.validators.get(ValidatorsError.ERROR);
        const illegalValidator = this.validators.get(ValidatorsError.ILLEGAL);
        if (errorValidatorn) {
            if (errorValidatorn(code))
                return `${code} ${this.errorCodeSuffix.get(ValidatorsError.ERROR)}`;
        }
        if (illegalValidator) {
            if (illegalValidator(code))
                return `${code} ${this.errorCodeSuffix.get(ValidatorsError.ILLEGAL)}`;
        }
        return code;
    }
}

// const codeToResult2 = new CodeToResult2(validators, ErrorCodeSuffix);

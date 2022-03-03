import { Validator } from './validators';

export class CodeToResult {
    private validators: Map<string, Validator>;
    constructor(validators: Map<string, Validator>) {
        this.validators = validators;
    }

    format(code: string): string {
        for (const [suffix, isValid] of this.validators) {
            if (!isValid(code)) {
                return code + suffix;
            }
        }
        return code;
    }
}

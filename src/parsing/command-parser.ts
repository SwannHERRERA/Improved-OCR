import { Helper } from '../helpers/helper';
import { ArgNotFound } from '../error/arg-not-found';

export enum CliFunctionnality {
    // eslint-disable-next-line no-unused-vars
    INPUT_FILE,
    // eslint-disable-next-line no-unused-vars
    OUTPUT_FILE,
    // eslint-disable-next-line no-unused-vars
    CONSOLE_OUTPUT,
    // eslint-disable-next-line no-unused-vars
    HELPER,
}

export class CommandParser {
    private argsParsed: Map<string, string[]>;
    private argsConfigured: Map<CliFunctionnality, string>;
    private argsWithoutValues: CliFunctionnality[];
    private helper: Helper;

    constructor(
        argsParsed: Map<string, string[]>,
        argsConfigured: Map<CliFunctionnality, string>,
        argsWithoutValues: CliFunctionnality[],
        helper: Helper
    ) {
        this.argsParsed = argsParsed;
        this.argsConfigured = argsConfigured;
        this.argsWithoutValues = argsWithoutValues;
        this.helper = helper;
    }

    parse(input: string): void {
        const formatedInput = this.formatInput(input);
        const inputSplit = formatedInput.split(' ');
        for (let i = 0; i < inputSplit.length; i += 2) {
            let argIsBoolean = false;
            for (const argWithoutValue of this.argsWithoutValues) {
                if (inputSplit[i] === this.argsConfigured.get(argWithoutValue)) {
                    this.mapBooleanArg(inputSplit[i]);
                    i -= 1;
                    argIsBoolean = true;
                }
            }
            if (!argIsBoolean) this.mapArgToValue(inputSplit[i], inputSplit[i + 1]);
        }
    }

    private formatInput(input: string): string {
        const re = /"([^"]*)"/gm;
        const stringParams = input.matchAll(re);
        let result = input;
        Array.from(stringParams).forEach((param) => {
            const paramMatched = param[1];
            const paramFormated = paramMatched.replace(/ /g, '$%&');
            result = result.replace(paramMatched, paramFormated);
        });
        return result.replace(/"/g, '');
    }

    private mapArgToValue(arg: string, value: string) {
        if (!this.isPresentInArgsConfigured(arg)) {
            this.helper.print();
            throw new ArgNotFound(`arg: ${arg} is not found`);
        }
        if (this.argsParsed.has(arg)) {
            this.argsParsed.get(arg)?.push(value);
        } else {
            this.argsParsed.set(arg, [value]);
        }
    }

    private mapBooleanArg(arg: string) {
        if (!this.isPresentInArgsConfigured(arg)) {
            this.helper.print();
            throw new ArgNotFound(`arg: ${arg} is not found`);
        }
        this.argsParsed.set(arg, []);
    }

    private isPresentInArgsConfigured(keyCandidate: string) {
        const argFound = Array.from(this.argsConfigured).find(
            (element: [CliFunctionnality, string]) => element[1] === keyCandidate
        );
        return argFound !== undefined;
    }

    public getArgsParsed(): Map<string, string[]> {
        return this.argsParsed;
    }
}

import { ArgNotFound } from './error/arg-not-found';

export enum CliFunctionnality {
    INPUT_FILE,
    OUTPUT_FILE,
    CONSOLE_OUTPUT,
}

export class Cli {
    private argsParsed: Map<string, string[]>;
    private argsConfigured: Map<CliFunctionnality, string>;

    constructor(argsParsed: Map<string, string[]>, argsConfigured: Map<CliFunctionnality, string>) {
        this.argsParsed = argsParsed;
        this.argsConfigured = argsConfigured;
    }

    parse(input: string): void {
        const formatedInput = this.formatInput(input);
        const inputSplit = formatedInput.split(' ');
        for (let i = 0; i < inputSplit.length; i += 2) {
            if(inputSplit[i] === "-c") {
                this.mapBooleanArg(inputSplit[i]);
                i-=1;
                continue;
            }
            this.mapArgToValue(inputSplit[i], inputSplit[i+1]);
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
        if (!this.isPresentInArgsConfigured(arg))
            throw new ArgNotFound(`arg: ${arg} is not found`);
        if (this.argsParsed.has(arg)) {
            this.argsParsed.get(arg)?.push(value);
        } else {
            this.argsParsed.set(arg, [value]);
        }
    }

    private mapBooleanArg(arg: string) {
        if (!this.isPresentInArgsConfigured(arg)) throw new ArgNotFound(`arg: ${arg} is not found`);

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

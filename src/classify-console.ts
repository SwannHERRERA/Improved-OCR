import { WriterInConsole } from "./writer/writer-in-console";

export interface ClassifyConsole {
    // eslint-disable-next-line no-unused-vars
    write(outputs: string[][]): void;
}

export class SimpleClassifyConsole implements ClassifyConsole {
    write(outputs: string[][]): void {
        const writer = new WriterInConsole();
        outputs.forEach((output) => writer.write(output));
    }
}
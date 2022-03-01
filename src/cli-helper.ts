import { Writer } from "./writer/writer"


export interface Helper {
    print(): void;
}
export class CliHelper implements Helper {

    private writer: Writer;
    private arrayhelp: string[] = [
        "usage: ./src/exec-improved-ocr.ts -f FileInputPath ...",
        "translate ocr files to number representation in three files Authorized Errored Unknown (you can specify multiple input files)\n",
        "usage: ./src/exec-improved-ocr.ts -f FilePath -o fileouputPath ...",
        "translate ocr file to number representation in the ouput file corresponding (you can specify multiple conbinations)\n",
        "usage: ./src/exec-improved-ocr.ts -c -f FilePath ...",
        "translate ocr file to number representation in the console (you can specify multiple input files)\n",
        'optional arguments:',
        '   -h                show this help message and exit',
        '   -c CONSOLE        specify to ouput in console',
        '   -f INPUT_FILE     specify the input file path with OCR text',
        '   -o OUTPUT_FILE    specify the ouput file path create or not',
    ]

    constructor(writer: Writer) {
        this.writer = writer;
    }

    print(): void {
        this.writer.write(this.arrayhelp);
    }
}

export const printHelper = (writer: Writer): void => {
    const arrayhelp = [
        "usage: ./src/exec-improved-ocr.ts -f FileInputPath ...",
        "translate ocr files to number representation in three files Authorized Errored Unknown (you can specify multiple input files)\n",
        "usage: ./src/exec-improved-ocr.ts -f FilePath -o fileouputPath ...",
        "translate ocr file to number representation in the ouput file corresponding (you can specify multiple conbinations)\n",
        "usage: ./src/exec-improved-ocr.ts -c -f FilePath ...",
        "translate ocr file to number representation in the console (you can specify multiple input files)\n",
        'optional arguments:',
        '   -h                show this help message and exit',
        '   -c CONSOLE        specify to ouput in console',
        '   -f INPUT_FILE     specify the input file path with OCR text',
        '   -o OUTPUT_FILE    specify the ouput file path create or not',
    ]
    writer.write(arrayhelp);
}
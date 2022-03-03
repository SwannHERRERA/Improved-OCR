import { textHelpers } from '../config';
import { Writer } from '../writer/writer';

export interface Helper {
    print(): void;
}
export class CliHelper implements Helper {
    private writer: Writer;
    constructor(writer: Writer) {
        this.writer = writer;
    }

    print(): void {
        this.writer.write(textHelpers);
    }
}

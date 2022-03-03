import { textHelpers } from '../config/config';
import { Writer } from '../writer/writer';
import { Helper } from './helper';
export class CliHelper implements Helper {
    private writer: Writer;
    constructor(writer: Writer) {
        this.writer = writer;
    }

    print(): void {
        this.writer.write(textHelpers);
    }
}

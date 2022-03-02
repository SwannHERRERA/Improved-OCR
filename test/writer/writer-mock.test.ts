import { Writer } from '../../src/writer/writer';

export class WriterMock implements Writer {
    public writed: string[] = [];
    async write(content: string[]): Promise<void> {
        content.forEach((str) => this.writed.push(str));
    }
}

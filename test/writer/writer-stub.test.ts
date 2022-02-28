import { Writer } from '../../src/writer/writer';

export class WriterStub implements Writer {
    private _called: string[] = [];
    public get called(): string[] {
        return this._called;
    }
    async write(content: string[]): Promise<void> {
        this.called.push(content.join('\n') + '\n');
    }
}

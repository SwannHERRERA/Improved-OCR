import { Writer } from './writer';

export class WriterInConsole implements Writer {
    async write(content: string[]): Promise<void> {
        process.stdout.write(content.join('\n') + '\n');
    }
}

import { Writer } from './writer';


export class WriterInConsole implements Writer {
    // eslint-disable-next-line no-unused-vars

    async write(content: string[]): Promise<void> {
        process.stdout.write(content.join('\n') + '\n')
    }
}

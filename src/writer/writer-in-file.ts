import fs from 'fs/promises';
import { Writer } from './writer';

export class WriterInFile implements Writer {
    private mode: 'a' | 'w';
    private path: string;
    // eslint-disable-next-line no-unused-vars
    private modeToAction: Map<'a' | 'w', (path: string, content: string[]) => Promise<void>> =
        new Map([
            ['a', this.appendInFile.bind(this)],
            ['w', this.writeInFile.bind(this)],
        ]);

    constructor(mode: 'a' | 'w', path: string) {
        this.mode = mode;
        this.path = path;
    }

    async write(content: string[]): Promise<void> {
        const writeFunction = this.modeToAction.get(this.mode);
        if (!writeFunction) throw new Error('method not supported');
        await writeFunction(this.path, content);
    }

    private async writeInFile(path: string, content: string[]): Promise<void> {
        await fs.writeFile(path, content.join('\n'));
    }

    private async appendInFile(path: string, content: string[]): Promise<void> {
        await fs.appendFile(path, content.join('\n') + '\n', {
            flag: 'a+',
        });
    }
}

import fs from 'fs/promises';

export interface Writer {
    // eslint-disable-next-line no-unused-vars
    write(content: string[]): Promise<void>;
}

export class WriterInFile implements Writer {
    private mode: 'a' | 'w';
    private path: string;
    // eslint-disable-next-line no-unused-vars
    private modeToAction: Map<'a' | 'w', (path: string, content: string[]) => Promise<void>> =
        new Map([
            ['a', this.appendInFile],
            ['w', this.writeInFile],
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

/*export const writeInFile = async (path: string, content: string[]): Promise<void> => {
    await fs.writeFile(path, content.join('\n'));
};
export const appendInFile = async (path: string, content: string[]): Promise<void> => {
    await fs.appendFile(path, content.join('\n'), {
        flag: 'a+',
    });
};*/

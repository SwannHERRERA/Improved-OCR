import fs from 'fs/promises';

export const writeInFile = async (path: string, content: string[]): Promise<void> => {
    await fs.writeFile(path, content.join('\n'));
};
export const appendInFile = async (path: string, content: string[]): Promise<void> => {
    await fs.appendFile(path, content.join('\n'));
};

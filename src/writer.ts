import fs from 'fs/promises';

export const writeInFile = async (path: string, content: string[]): Promise<void> => {
    await fs.writeFile(path, content.join('\n'));
};

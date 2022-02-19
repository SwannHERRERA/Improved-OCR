import fs from 'fs/promises';

export const writeInFile = async (path: string, content: string | string[]): Promise<void> => {
    await fs.writeFile(path, typeof content === 'string' ? content : content.join('\n'));
};

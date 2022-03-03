import fs from 'fs/promises';
import { NoSuchFileOrDirectory } from '../error/no-such-file-or-directory';

export const readFile = async (pathToFile: string): Promise<string> => {
    try {
        return await fs.readFile(pathToFile, { encoding: 'utf-8' });
    } catch (error) {
        throw new NoSuchFileOrDirectory('file does not exist');
    }
};
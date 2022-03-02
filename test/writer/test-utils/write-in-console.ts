import { Writer } from '../../../src/writer/writer';
import { WriterInConsole } from '../../../src/writer/writer-in-console';

const writer: Writer = new WriterInConsole();
writer.write(['jean', 'pomme']);

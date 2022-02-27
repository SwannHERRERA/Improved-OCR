import { Writer } from "../writer";
import { WriterInConsole } from "../writer-in-console";

const writer: Writer = new WriterInConsole();
writer.write(["jean", "pomme"]);
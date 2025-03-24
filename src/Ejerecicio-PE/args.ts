import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { detectedWords } from "../Ejerecicio-PE/functions.js";

/**
 * Mediante argumento por linea de comando, encuentra una ruta y una palabra a buscar en un fichero
 */
yargs(hideBin(process.argv))
  .command(
    "search",
    "Adds a new Funko to the collection",
    {
        path: { description: "pathname", type: "string", demandOption: true},
        word: { description: "wordsearch", type: "string", demandOption: true}
    },
    (argv) => {
        const pathname = argv.path;
        const wordsearch = argv.word;
        detectedWords(pathname, wordsearch);
    }
  )
  .help()
  .argv;
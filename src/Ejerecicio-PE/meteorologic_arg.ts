import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { convert } from "../Ejerecicio-PE/meteorologic.js";

/**
 * Mediante argumento por linea de comando, encuentra una ruta de entrada y una ruta de salida
 */
yargs(hideBin(process.argv))
  .command(
    "search",
    "Adds a new Funko to the collection",
    {
        path_input: { description: "path_input", type: "string", demandOption: true},
        path_output: { description: "path_output", type: "string", demandOption: true}
    },
    (argv) => {
        const pathinput = argv.path_input;
        const pathoutput = argv.path_output;
        convert(pathinput, pathoutput);
    }
  )
  .help()
  .argv;
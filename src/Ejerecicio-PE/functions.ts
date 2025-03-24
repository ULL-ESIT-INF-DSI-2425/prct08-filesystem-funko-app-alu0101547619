import fs from "fs";
import path from "path";

/**
 * Metodo que enumera las ocurrencias de una palabra
 * @param path_ Ruta del fichero
 * @param searchword Palabra a buscar en el fichero
 * @return Numero de ocurrencias de la palabra en el fichero
 */
export function detectedWords(path_: string, searchword: string) {
    let matches;
    const my_regex = new RegExp(searchword, "g");
    const dis_path: string = path.join(process.cwd(), path_);
    console.log(dis_path);
    fs.access(path_, fs.constants.F_OK, (err) => {
        if (err) console.log("Error en el acceso al fichero");
        else fs.readFile(path_, "utf-8", (readErr, data) => {
            if (readErr) console.log("Error en el acceso de lectura");
            else {
                matches = data.match(my_regex);
                matches = matches?.length;
                console.log( `Numero de ocurrencias de ${searchword}: ${matches}`);
            }
        })
    })
}
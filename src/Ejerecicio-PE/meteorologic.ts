import fs from "fs";
import path from "path";

/**
 * Metodo que convierte un fichero .json a un fichero .csv
 * @param path_input Ruta del archivo del json
 * @param path_output Ruta del archivo de salida
 */
export function convert(path_input: string, path_output: string) {
    const dis_path_input: string = path.join(process.cwd(), path_input);
    const dis_path_output: string = path.join(process.cwd(), path_output);
    const obj = JSON.parse(dis_path_input);
    const headers = Object.keys(obj).join(",");
    const lenght_list: number = obj.length; 
    fs.access(dis_path_output, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.mkdir(dis_path_output, (errMkdir) => {
                if (errMkdir) {
                  console.error(`Error al crear el directorio`);
                }
              });
        } else {
          fs.writeFile(dis_path_output, headers, (writeErr) => {
            if (writeErr) {
              console.log(`Error updating file: ${writeErr.message}`);
            }
          });
        }
        for (let i = 0; i < lenght_list - 1; i++) {
            fs.writeFile(dis_path_output, headers, (writeErr) => {
                if (writeErr) {
                  
                }
              });
        }
    });
}
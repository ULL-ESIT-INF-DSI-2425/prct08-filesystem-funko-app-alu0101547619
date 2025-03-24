// src/services/collection.ts
import fs from "fs";
import path from "path";
import { Funko } from "../enum/funko_type.js";
import chalk from "chalk";

export class FunkoCollection {
  private user: string;
  private dir: string;

  constructor(user: string) {
    this.user = user;
    this.dir = path.join(process.cwd(), this.user);
    fs.access(this.dir, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(this.dir, (errMkdir) => {
          if (errMkdir) {
            console.error(chalk.red(`Error creating directory: ${errMkdir.message}`));
          }
        });
      }
    });
  }

  private getFilePath(id: number): string {
    return path.join(this.dir, `${id}.json`);
  }

  public addFunko(funko: Funko): void {
    const filePath = this.getFilePath(funko.id);
    fs.access(this.dir, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`Funko already exists in ${this.user} collection!`));
      } else {
        fs.writeFile(filePath, JSON.stringify(funko, null, 2), (writeErr) => {
          if (writeErr) {
            console.log(chalk.red(`Error writing file: ${writeErr.message}`));
          } else {
            console.log(chalk.green(`New Funko added to ${this.user} collection!`));
          }
        });
      }
    });
  }

  // Modificar un Funko de forma asíncrona.
  public updateFunko(funko: Funko): void {
    const filePath = this.getFilePath(funko.id);
    fs.access(this.dir, fs.constants.F_OK, (err) => {
      if (!err) {
        console.log(chalk.red(`Funko not found in ${this.user} collection!`));
      } else {
        fs.writeFile(filePath, JSON.stringify(funko, null, 2), (writeErr) => {
          if (writeErr) {
            console.log(chalk.red(`Error updating file: ${writeErr.message}`));
          } else {
            console.log(chalk.green(`Funko updated in ${this.user} collection!`));
          }
        });
      }
    });
  }

  // Eliminar un Funko de forma asíncrona.
  public removeFunko(id: number): void {
    const filePath = this.getFilePath(id);
    fs.access(this.dir, fs.constants.F_OK, (err) => {
      if (!err) {
        console.log(chalk.red(`Funko not found in ${this.user} collection!`));
      } else {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.log(chalk.red(`Error deleting file: ${unlinkErr.message}`));
          } else {
            console.log(chalk.green(`Funko removed from ${this.user} collection!`));
          }
        });
      }
    });
  }

  // Leer un Funko concreto de forma asíncrona.
  public readFunko(id: number): void {
    const filePath = this.getFilePath(id);
    fs.access(this.dir, fs.constants.F_OK, (err) => {
      if (!err) {
        console.log(chalk.red(`Funko not found in ${this.user} collection!`));
      } else {
        fs.readFile(filePath, "utf-8", (readErr, data) => {
          if (readErr) {
            console.log(chalk.red(`Error reading file: ${readErr.message}`));
          } else {
            try {
              const funko: Funko = JSON.parse(data);
              this.displayFunko(funko);
            } catch (parseErr: any) {
              console.log(chalk.red(`Error parsing JSON: ${parseErr.message}`));
            }
          }
        });
      }
    });
  }

  // Listar todos los Funkos de forma asíncrona.
  public listFunko(): void {
    fs.readdir(this.dir, (readDirErr, files) => {
      if (readDirErr) {
        console.log(chalk.red(`Error reading directory: ${readDirErr.message}`));
        return;
      }
      const jsonFiles = files.filter((file) => file.endsWith(".json"));
      if (jsonFiles.length === 0) {
        console.log(chalk.red(`No Funkos found in ${this.user} collection!`));
        return;
      }
      console.log(chalk.green(`${this.user} Funko Collection`));
      jsonFiles.forEach((file) => {
        const filePath = path.join(this.dir, file);
        fs.readFile(filePath, "utf-8", (readErr, data) => {
          if (readErr) {
            console.log(chalk.red(`Error reading file ${file}: ${readErr.message}`));
          } else {
            try {
              const funko: Funko = JSON.parse(data);
              this.displayFunko(funko);
              console.log(chalk.green("-------------------------------"));
            } catch (parseErr: any) {
              console.log(chalk.red(`Error parsing file ${file}: ${parseErr.message}`));
            }
          }
        });
      });
    });
  }

  // Función para mostrar la información de un Funko con el valor de mercado coloreado.
  private displayFunko(funko: Funko): void {
    let marketColor = chalk.white;
    // Definir rangos de valor de mercado y asignar colores.
    if (funko.marketValue < 50) {
      marketColor = chalk.red;
    } else if (funko.marketValue < 100) {
      marketColor = chalk.yellow;
    } else if (funko.marketValue < 200) {
      marketColor = chalk.blue;
    } else {
      marketColor = chalk.green;
    }

    console.log(`ID: ${funko.id}`);
    console.log(`Name: ${funko.name}`);
    console.log(`Description: ${funko.description}`);
    console.log(`Type: ${funko.type}`);
    console.log(`Genre: ${funko.genre}`);
    console.log(`Franchise: ${funko.franchise}`);
    console.log(`Number: ${funko.number}`);
    console.log(`Exclusive: ${funko.exclusive}`);
    console.log(`Special Features: ${funko.specialFeatures}`);
    console.log(`Market Value: ${marketColor(funko.marketValue.toString())}`);
  }
}

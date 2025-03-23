// src/commands/cli.ts
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoCollection } from "../services/services.js";
import { Funko, FunkoGenre, FunkoType } from "../enum/funko_type.js";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a new Funko to the collection",
    {
      user: { description: "Username", type: "string", demandOption: true },
      id: { description: "Funko ID", type: "number", demandOption: true },
      name: { description: "Funko name", type: "string", demandOption: true },
      desc: { description: "Funko description", type: "string", demandOption: true },
      type: { description: "Funko type", type: "string", demandOption: true },
      genre: { description: "Funko genre", type: "string", demandOption: true },
      franchise: { description: "Funko franchise", type: "string", demandOption: true },
      number: { description: "Funko number", type: "number", demandOption: true },
      exclusive: { description: "Is it exclusive?", type: "boolean", demandOption: true },
      specialFeatures: { description: "Special features", type: "string", demandOption: true },
      marketValue: { description: "Market value", type: "number", demandOption: true }
    },
    (argv) => {
      const collection = new FunkoCollection(argv.user as string);
      // Aquí se hace una conversión a los enumerados según convenga
      const typeValue = argv.type as string;
      const genreValue = argv.genre as string;
      const funko = new Funko(
        argv.id as number,
        argv.name as string,
        argv.desc as string,
        typeValue as FunkoType,
        genreValue as FunkoGenre,
        argv.franchise as string,
        argv.number as number,
        argv.exclusive as boolean,
        argv.specialFeatures as string,
        argv.marketValue as number
      );
      collection.addFunko(funko);
    }
  )
  .command(
    "update",
    "Updates an existing Funko",
    {
      user: { description: "Username", type: "string", demandOption: true },
      id: { description: "Funko ID", type: "number", demandOption: true },
      name: { description: "Funko name", type: "string", demandOption: true },
      desc: { description: "Funko description", type: "string", demandOption: true },
      type: { description: "Funko type", type: "string", demandOption: true },
      genre: { description: "Funko genre", type: "string", demandOption: true },
      franchise: { description: "Funko franchise", type: "string", demandOption: true },
      number: { description: "Funko number", type: "number", demandOption: true },
      exclusive: { description: "Is it exclusive?", type: "boolean", demandOption: true },
      specialFeatures: { description: "Special features", type: "string", demandOption: true },
      marketValue: { description: "Market value", type: "number", demandOption: true }
    },
    (argv) => {
      const collection = new FunkoCollection(argv.user as string);
      const funko = new Funko(
        argv.id as number,
        argv.name as string,
        argv.desc as string,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise as string,
        argv.number as number,
        argv.exclusive as boolean,
        argv.specialFeatures as string,
        argv.marketValue as number
      );
      collection.updateFunko(funko);
    }
  )
  .command(
    "remove",
    "Removes an existing Funko",
    {
      user: { description: "Username", type: "string", demandOption: true },
      id: { description: "Funko ID", type: "number", demandOption: true }
    },
    (argv) => {
      const collection = new FunkoCollection(argv.user as string);
      collection.removeFunko(argv.id as number);
    }
  )
  .command(
    "read",
    "Reads a Funko details",
    {
      user: { description: "Username", type: "string", demandOption: true },
      id: { description: "Funko ID", type: "number", demandOption: true }
    },
    (argv) => {
      const collection = new FunkoCollection(argv.user as string);
      collection.readFunko(argv.id as number);
    }
  )
  .command(
    "list",
    "Lists all Funkos in the collection",
    {
      user: { description: "Username", type: "string", demandOption: true }
    },
    (argv) => {
      const collection = new FunkoCollection(argv.user as string);
      collection.listFunko();
    }
  )
  .help()
  .argv;

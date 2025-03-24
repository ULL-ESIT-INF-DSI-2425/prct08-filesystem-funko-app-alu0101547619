export enum FunkoType {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    VynilSoda = "Vynil Soda",
    VynilGold = "Vynil Gold"
  }
  
  export enum FunkoGenre {
    Animacion = "Animación",
    PeliculasTV = "Películas y TV",
    Videojuegos = "Videojuegos",
    Deportes = "Deportes",
    Musica = "Música",
    Anime = "Ánime"
  }
  
  export class Funko {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public type: FunkoType,
      public genre: FunkoGenre,
      public franchise: string,
      public number: number,
      public exclusive: boolean,
      public specialFeatures: string,
      public marketValue: number
    ) {}
  
    public toString(): string {
      return `ID: ${this.id}\nName: ${this.name}\nDescription: ${this.description}\nType: ${this.type}\nGenre: ${this.genre}\nFranchise: ${this.franchise}\nNumber: ${this.number}\nExclusive: ${this.exclusive}\nSpecial Features: ${this.specialFeatures}\nMarket Value: ${this.marketValue}`;
    }
  }
  
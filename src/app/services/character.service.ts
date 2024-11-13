import { Injectable } from '@angular/core';
// Importar el archivo JSON desde la carpeta assets/data
import * as charactersData from '../../assets/data/characters.json';
// Importar las interfaces desde models
import { ICharactersByFloor, ICharacter } from '../models/character.model'; // Actualizado con la "I"

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  // Cargar los datos de los personajes desde el archivo JSON
  private characters: ICharactersByFloor = charactersData;

  constructor() {}

  // Método para obtener el número total de personajes
  getTotalCharacters(): number {
    let totalCharacters = 0;
    for (const floor in this.characters) {
      if (Object.prototype.hasOwnProperty.call(this.characters, floor)) {
        totalCharacters += this.characters[floor].length; // Sumar los personajes por piso
      }
    }
    return totalCharacters;
  }

  // Método para obtener el número de personajes por piso
  getCharactersByFloor(): { [key: string]: number } {
    let charactersByFloor: { [key: string]: number } = {};

    for (const floor in this.characters) {
      if (Object.prototype.hasOwnProperty.call(this.characters, floor)) {
        charactersByFloor[floor] = this.characters[floor].length; // Número de personajes por piso
      }
    }
    return charactersByFloor;
  }

  // Método para obtener los personajes de un piso específico
  getCharactersByFloorName(floor: string): ICharacter[] {
    return this.characters[floor] || []; // Si no se encuentra el piso, devuelve un array vacío
  }
}

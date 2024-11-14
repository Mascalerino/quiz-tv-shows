import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service'; // Asegúrate de importar el servicio
import { ICharacter } from '../models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  totalCharacters: number = 0;
  points: number = 0;
  foundMatch: boolean = false;

  // Propiedades para los personajes
  characters1A: ICharacter[] = [];
  characters1B: ICharacter[] = [];
  characters2A: ICharacter[] = [];
  characters2B: ICharacter[] = [];
  characters3A: ICharacter[] = [];
  characters3B: ICharacter[] = [];
  charactersAtico: ICharacter[] = [];
  charactersPorteria: ICharacter[] = [];
  charactersVideoclub: ICharacter[] = [];
  characterOtros: ICharacter[] = [];

  // Propiedades para saber si la tabla está llena
  isFilled1A: boolean = false;
  isFilled1B: boolean = false;
  isFilled2A: boolean = false;
  isFilled2B: boolean = false;
  isFilled3A: boolean = false;
  isFilled3B: boolean = false;
  isFilledAtico: boolean = false;
  isFilledPorteria: boolean = false;
  isFilledVideoclub: boolean = false;
  isFilledOtros: boolean = false;

  searchTerm: string = ''; // Para almacenar el término de búsqueda

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.totalCharacters = this.characterService.getTotalCharacters();
    this.getCharactersByFloor();
  }

  // Método para obtener los personajes por piso
  private getCharactersByFloor(): void {
    this.characters1A = this.characterService.getCharactersByFloorName('1A');
    this.characters1B = this.characterService.getCharactersByFloorName('1B');
    this.characters2A = this.characterService.getCharactersByFloorName('2A');
    this.characters2B = this.characterService.getCharactersByFloorName('2B');
    this.characters3A = this.characterService.getCharactersByFloorName('3A');
    this.characters3B = this.characterService.getCharactersByFloorName('3B');
    this.charactersAtico =
      this.characterService.getCharactersByFloorName('Atico');
    this.charactersPorteria =
      this.characterService.getCharactersByFloorName('Porteria');
    this.charactersVideoclub =
      this.characterService.getCharactersByFloorName('Videoclub');
    this.characterOtros =
      this.characterService.getCharactersByFloorName('Otros');
  }

  // Método para actualizar el showCharacter de los personajes
  searchCharacters(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    // Filtrar los personajes por piso y actualizar `showCharacter`
    this.updateCharacterVisibility(
      this.characters1A,
      searchTermLower,
      'isFilled1A'
    );
    this.updateCharacterVisibility(
      this.characters1B,
      searchTermLower,
      'isFilled1B'
    );
    this.updateCharacterVisibility(
      this.characters2A,
      searchTermLower,
      'isFilled2A'
    );
    this.updateCharacterVisibility(
      this.characters2B,
      searchTermLower,
      'isFilled2B'
    );
    this.updateCharacterVisibility(
      this.characters3A,
      searchTermLower,
      'isFilled3A'
    );
    this.updateCharacterVisibility(
      this.characters3B,
      searchTermLower,
      'isFilled3B'
    );
    this.updateCharacterVisibility(
      this.charactersAtico,
      searchTermLower,
      'isFilledAtico'
    );
    this.updateCharacterVisibility(
      this.charactersPorteria,
      searchTermLower,
      'isFilledPorteria'
    );
    this.updateCharacterVisibility(
      this.charactersVideoclub,
      searchTermLower,
      'isFilledVideoclub'
    );
    this.updateCharacterVisibility(
      this.characterOtros,
      searchTermLower,
      'isFilledOtros'
    );

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  // Método para actualizar el showCharacter de cada personaje
  private updateCharacterVisibility(
    characters: ICharacter[],
    searchTerm: string,
    tableFilled: string
  ): void {
    characters.forEach((character) => {
      if (character.showCharacter === false) {
        const matchFound = character.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm
        );
        if (matchFound) {
          character.showCharacter = true;
          this.foundMatch = true;
          this.points++;
        }
      }
    });

    // Cuando todos los personajes de una tabla se muestran, marcamos la tabla como llena
    if (characters.every((character) => character.showCharacter)) {
      (this as any)[tableFilled] = true; // Cambiar el estado de la tabla a "llena"
    }
  }
}

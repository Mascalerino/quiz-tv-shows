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
  charactersByFloor: { [key: string]: number } = {};
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
  searchTerm: string = ''; // Para almacenar el término de búsqueda
  foundMatch: boolean = false;
  points: number = 0;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    // Obtener el número total de personajes
    this.totalCharacters = this.characterService.getTotalCharacters();

    // Llamar al método para obtener los personajes de cada piso
    this.getCharactersByFloor();
  }

  /**
   * Método para obtener los personajes por piso
   */
  private getCharactersByFloor(): void {
    this.characters1A = this.characterService.getCharactersByFloorName('1A');
    this.characters1B = this.characterService.getCharactersByFloorName('1B');
    this.characters2A = this.characterService.getCharactersByFloorName('2A');
    this.characters2B = this.characterService.getCharactersByFloorName('2B');
    this.characters3A = this.characterService.getCharactersByFloorName('3A');
    this.characters3B = this.characterService.getCharactersByFloorName('3B');
    this.charactersAtico =
      this.characterService.getCharactersByFloorName('atico');
    this.charactersPorteria =
      this.characterService.getCharactersByFloorName('porteria');
    this.charactersVideoclub =
      this.characterService.getCharactersByFloorName('videoclub');
    this.characterOtros =
      this.characterService.getCharactersByFloorName('otros');
  }

  /**
   * Método para actualizar el showCharacter de los personajes
   * basándonos en el término de búsqueda.
   */
  searchCharacters(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    // Filtrar los personajes por piso y actualizar `showCharacter`
    this.updateCharacterVisibility(this.characters1A, searchTermLower);
    this.updateCharacterVisibility(this.characters1B, searchTermLower);
    this.updateCharacterVisibility(this.characters2A, searchTermLower);
    this.updateCharacterVisibility(this.characters2B, searchTermLower);
    this.updateCharacterVisibility(this.characters3A, searchTermLower);
    this.updateCharacterVisibility(this.characters3B, searchTermLower);
    this.updateCharacterVisibility(this.charactersAtico, searchTermLower);
    this.updateCharacterVisibility(this.charactersPorteria, searchTermLower);
    this.updateCharacterVisibility(this.charactersVideoclub, searchTermLower);
    this.updateCharacterVisibility(this.characterOtros, searchTermLower);

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  /**
   * Método para actualizar el atributo `showCharacter` de cada personaje
   * basado en la coincidencia con el término de búsqueda.
   */
  private updateCharacterVisibility(
    characters: ICharacter[],
    searchTerm: string
  ): void {
    characters.forEach((character) => {
      if (character.showCharacter === false) {
        // Solo cambiar si no se ha establecido previamente
        const matchFound = character.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm // Exact match with the search term
        );
        if (matchFound) {
          character.showCharacter = true;
          this.foundMatch = true;
          this.points++;
        }
      }
    });
  }
}

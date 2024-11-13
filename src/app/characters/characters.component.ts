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

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    // Obtener el número total de personajes
    this.totalCharacters = this.characterService.getTotalCharacters();

    // Obtener el número de personajes por piso
    this.charactersByFloor = this.characterService.getCharactersByFloor();
  }
}

export interface ICharacter {
  fullName: string;
  explanation: string;
  posibilyInputs: string[];
}

export interface ICharactersByFloor {
  [floor: string]: ICharacter[];
}

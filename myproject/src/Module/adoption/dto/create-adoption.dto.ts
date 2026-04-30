import { IsInt, Min } from 'class-validator';

export class CreateAdoptionDto { //Formulaire
  @IsInt()
  @Min(1)
  pokemonId: number;

  @IsInt()
  @Min(1)
  formulaireId: number;
}
import { IsInt, Min } from 'class-validator';

export class CreateAdoptionDto {
  @IsInt()
  @Min(1)
  pokemonId: number;
}
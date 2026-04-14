import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormulaireDto {
  @IsInt()
  idClient: number;

  @IsString()
  @IsNotEmpty()
  nomComplet: string;

  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  typeLogement: string;

  @IsBoolean()
  aDejaEuPokemon: boolean;

  @IsOptional()
  @IsString()
  autresAnimauxMaison?: string;

  @IsString()
  @IsNotEmpty()
  motivationAdoption: string;

  @IsArray()
  typePokemonSouhaite: string[];

  @IsString()
  @IsNotEmpty()
  tempsDisponibleParJour: string;

  @IsString()
  @IsNotEmpty()
  engagementLongTerme: string;

  @IsString()
  @IsNotEmpty()
  gestionAdaptationPokemon: string;
}
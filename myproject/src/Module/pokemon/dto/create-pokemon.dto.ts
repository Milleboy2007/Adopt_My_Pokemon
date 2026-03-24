import { IsString, IsNumber, Min, IsArray, IsNotEmpty, IsPositive, ArrayNotEmpty, IsInt } from 'class-validator';


export class CreatePokemon{

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @IsPositive()
  grandeur: number;

  @IsNumber()
  @IsPositive()
  poids: number;

  @IsArray()
  @ArrayNotEmpty({message:'Un pokémon doit avoir aumoin un type'})
  @IsString({each:true})
  type: string[];

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  niveau: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  prix: number;
}
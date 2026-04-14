import { IsString, IsNumber, Min, IsArray, IsNotEmpty, IsPositive, ArrayNotEmpty, IsInt, IsEnum } from 'class-validator';
import { PokeType } from '../entities/pokemon.entity';


export class CreatePokemon{

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  grandeur: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  poids: number;

  @IsArray()
  @ArrayNotEmpty({message:'Un pokémon doit avoir aumoin un type'})
  @IsEnum(PokeType, {each:true})
  type: PokeType[];

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  niveau: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  prix: number;
}
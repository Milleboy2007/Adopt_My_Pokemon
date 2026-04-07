import { IsString  } from 'class-validator';

export class createFormulaireDto {
    @IsString()
    contenu: string;
  
}
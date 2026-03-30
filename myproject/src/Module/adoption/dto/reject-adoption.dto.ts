import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectAdoptionDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
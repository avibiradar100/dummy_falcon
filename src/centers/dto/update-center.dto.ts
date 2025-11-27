import { IsString, IsOptional } from 'class-validator';

export class UpdateCenterDto {
  @IsString()
  @IsOptional()
  centerName?: string;

  @IsString()
  @IsOptional()
  centerTelNo?: string;

  @IsString()
  @IsOptional()
  centerZipCode?: string;

  @IsString()
  @IsOptional()
  centerAddress1?: string;

  @IsString()
  @IsOptional()
  centerAddress2?: string;

  @IsString()
  @IsOptional()
  centerAddress3?: string;

  @IsString()
  @IsOptional()
  timezone?: string;
}

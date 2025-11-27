import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  centerId: string;

  @IsString()
  @IsNotEmpty()
  centerName: string;

  @IsString()
  centerTelNo: string;

  @IsString()

  centerZipCode: string;

  @IsString()

  centerAddress1: string;

  @IsString()

  centerAddress2: string;

  @IsString()

  centerAddress3: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;
}

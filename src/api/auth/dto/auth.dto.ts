import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public id: number;

  @IsArray()
  @IsNumber({},{each: true})
  @IsNotEmpty()
  public roles: number[];
}

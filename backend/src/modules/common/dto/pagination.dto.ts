import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  page: number;

  @IsNotEmpty()
  @Expose()
  limit: number;


  constructor(partial: Partial<PaginationDto>) {
    Object.assign(this, partial);
    this.page = this.page || 1;
    this.limit = this.limit || 50;
  }
}

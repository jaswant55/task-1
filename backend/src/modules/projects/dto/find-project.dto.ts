import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { PaginationDto } from "src/modules/common/dto/pagination.dto";



class FilterDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    id: string[];

    @IsOptional()
    @IsString()
    owner:string;

    @IsOptional()
    @IsString()
    status:string;
    
}
export class FindProjectDto {
    @IsObject()
    @IsNotEmpty()
    @Type(() => FilterDto)
    @ValidateNested({ each: true })
    filter: FilterDto;

    @IsObject()
    @IsNotEmpty()
    @Type(() => PaginationDto)
    @ValidateNested({ each: true })
    pagination: PaginationDto;

}
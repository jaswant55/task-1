import { IsNotEmpty, IsObject } from "class-validator";
import { ProjectDto } from "./project.dto";

export class ListProjectDto{
    @IsObject()
    @IsNotEmpty()
    data:ProjectDto[]

    @IsObject()
    @IsNotEmpty()
    pagination:any
}
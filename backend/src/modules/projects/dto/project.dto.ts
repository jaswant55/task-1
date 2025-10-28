import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Project } from "../project.schema";

export class ProjectDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    status: string

    @IsNotEmpty()
    @IsMongoId()
    owner: string


    constructor(project){
        console.log('step-1',project)
        this.id = project._id;
        this.title = project.title;
        this.description = project.description || '',
        this.status = project.status;
        this.owner = project.owner && {
            id:project.owner._id,
            name:project.owner.name,
            email:project.owner.email
        }
    }
}
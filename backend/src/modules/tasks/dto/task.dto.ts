import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TaskDto {
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
    project: string;


     constructor(task){
        console.log('step-2',task)
        this.id = task._id;
        this.title = task.title;
        this.description = task.description || '',
        this.status = task.status;
        this.project = task.project && {
            id:task.project._id,
            title:task.project.title
        }
    }

}
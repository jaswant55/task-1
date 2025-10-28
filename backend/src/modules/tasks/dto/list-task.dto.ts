import { IsNotEmpty, IsObject } from "class-validator";
import { TaskDto } from "./task.dto"; 

export class ListTaskDto{
    @IsObject()
    @IsNotEmpty()
    data:TaskDto[]

    @IsObject()
    @IsNotEmpty()
    pagination:any
}
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ProjectDocument = Project | Document

@Schema({timestamps:true})
export class Project {
    @Prop({required:true,set:(value:string)=> value.trim()})
    title:string

    @Prop({set:(value:string)=> value.trim()})
    description:string

    @Prop({default:'active'})
    status:'active' | 'completed';

    @Prop({type:Types.ObjectId, ref:'User', required:true})
    owner:Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project)


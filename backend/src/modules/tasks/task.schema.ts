import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
export type TaskDocument = Task | Document

@Schema({timestamps:true})
export class Task {
 @Prop({ required: true, set:(value:string)=> value.trim() })
  title: string;

  @Prop({set:(value:string)=> value.trim()})
  description?: string;

  @Prop({ default: 'todo' })
  status: 'todo' | 'in-progress' | 'done';

  @Prop()
  dueDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task)
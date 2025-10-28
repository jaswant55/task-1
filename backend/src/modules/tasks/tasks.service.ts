import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTaskDto } from './dto/find-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model, PreMiddlewareFunction, Types } from 'mongoose';
import { TaskDto } from './dto/task.dto';
import { ListTaskDto } from './dto/list-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private task:Model<TaskDocument>){}

  async create(createTaskDto: CreateTaskDto):Promise<TaskDto> {
    const task = new this.task(createTaskDto);
    const savedTask =await  task.save();
    return await this.findOne(String(savedTask._id))
  }

  async findAll(body:FindTaskDto):Promise<ListTaskDto> {
    const query:any = {}
    const {filter,pagination} = body;

    const limit = pagination.limit;
    const page= pagination.page;
    const skip = (page -1) * limit;


     if (filter.status) {
          query.status = filter.status;
        }
    
    if (filter.id && filter.id.length > 0) {
      query._id = {
        $in: filter.id.map(id => new Types.ObjectId(id))
      };
    }

    if(filter['project'] !== undefined){
       query.project = filter['project']
    }

    const [tasks, total] = await Promise.all([
      this.task.find(query)
       .skip(skip)
        .limit(limit)
        .populate('project')
        .exec(),
      this.task.countDocuments(query).exec()
    ]);

    return {
      data:tasks.map((item)=>new  TaskDto(item)),
      pagination:{
        page, limit, total
      }
    }
  }

  async findOne(id: string):Promise<TaskDto> {
    console.log('step-11',id)
    const task = await this.task.findById({_id:id}).populate('project').exec()
    console.log('step-12',task)
    if(!task){
      throw new NotFoundException('Task Not found')
    }
    return new TaskDto(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto):Promise<TaskDto> {
     const prev = await this.findOne(id)

    const { ...safeUpdateData } = updateTaskDto;
    const allowedUpdate = {};
    const allowedFields = ['title', 'description', 'status'];

    allowedFields.forEach(field => {
      if (updateTaskDto[field] !== undefined) {
        allowedUpdate[field] = updateTaskDto[field]
      }
    })

    const updateProject = await this.task.findByIdAndUpdate(id, { $set: allowedUpdate })
    return await this.findOne(id);
  }

  async remove(projectId:string,id: string):Promise<void> {
    //check task is exist or not
    this.findOne(id);
    await this.task.deleteOne({_id:id, project:new Types.ObjectId(projectId)})
  }
}

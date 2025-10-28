import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTaskDto } from './dto/find-task.dto';
import { Types } from 'mongoose';

@Controller('/projects')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':projectId/tasks')
  async create(@Param('projectId') projectId:string,@Body() createTaskDto: CreateTaskDto) {
    try{
      console.log('task create projectID',projectId)
      createTaskDto['project'] = new Types.ObjectId(projectId)
      return await this.tasksService.create(createTaskDto);

    }catch(err){
      throw new Error(err)
    }
  }

  @Post(':projectId/tasks/list')
   async findAll(@Param('projectId') projectId:string,@Body() findTaskDto:FindTaskDto) {
    try{
      findTaskDto.filter['project'] = new Types.ObjectId(projectId)
      return await this.tasksService.findAll(findTaskDto);
    }catch(err){
      throw new Error(err)
    }
  }

  @Get(':projectId/tasks/:id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.tasksService.findOne(id);

    }catch(err){
      throw new Error(err)
    }
  }

  @Patch(':projectId/tasks/:id')
  async update(@Param('projectId') projectId:string,@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try{
      updateTaskDto['project'] =new Types.ObjectId(projectId)
      return await  this.tasksService.update(id, updateTaskDto);

    }catch(err){
      throw new Error(err)
    }
  }

  @Delete(':projectId/tasks/:id')
  async remove(@Param('projectId') projectId:string,@Param('id') id: string) {
    try{
  
      return await this.tasksService.remove(projectId,id);

    }catch(err){
      throw new Error(err)
    }
  }
}

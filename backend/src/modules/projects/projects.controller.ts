import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectDto } from './dto/find-project.dto';
import { SessionUser } from '../common/decorators/session-user.decorator';
import { Types } from 'mongoose';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto,@SessionUser() user) {
    try{
      createProjectDto['owner'] = new Types.ObjectId(user.userId)      
      return  await this.projectsService.create(createProjectDto);
    }catch(err){
      throw new Error(err)
    }
  }

  @Post('list')
  async findAll(@Body() findProjectDto:FindProjectDto, @SessionUser() user) {
    try{
        findProjectDto.filter['owner'] = user.userId
      return await this.projectsService.findAll(findProjectDto);
    }catch(err){
      throw new Error(err)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return this.projectsService.findOne(id);
    }catch(err){
      throw new Error(err)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto,@SessionUser() user) {
    try{
      updateProjectDto['owner'] = new Types.ObjectId(user.userId)
      return await this.projectsService.update(id, updateProjectDto);
    }catch(err){
      throw new Error(err)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{  
      return await this.projectsService.remove(id);
    }catch(err){
      throw new Error(err)
    }
  }
}

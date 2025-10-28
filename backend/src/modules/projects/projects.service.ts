  import { Injectable, NotFoundException } from '@nestjs/common';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { Project, ProjectDocument } from './project.schema';
  import { Model, Types } from 'mongoose';
  import { FindProjectDto } from './dto/find-project.dto';
  import { ProjectDto } from './dto/project.dto';
  import { ListProjectDto } from './dto/list-project.dto';

  @Injectable()
  export class ProjectsService {
    constructor(@InjectModel(Project.name) private project: Model<ProjectDocument>) { }

    async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
      const project = new this.project(createProjectDto)
      const projectSaved = await project.save()
      console.log('projectSaved', projectSaved)
      return this.findOne(String(projectSaved._id))
    }

    async findAll(body: FindProjectDto):Promise<ListProjectDto> {
      const { filter, pagination } = body;
      //build query
      const query: any = {};

      if (filter.owner) {
        query.owner = new Types.ObjectId(filter.owner)
      }
      
      if(filter.status && filter.status !== "" && filter.status !== "all"){
        query.status = filter.status
      }

      if (filter.id && filter.id.length > 0) {
        query._id = {
          $in: filter.id.map(id => new Types.ObjectId(id))
        };
      }

      //pagination
      const page = pagination.page;
      const limit = pagination.limit;
      const skip = (page - 1) * limit;

      const [projects, total] = await Promise.all([
        this.project.find(query)
          .skip(skip)
          .limit(limit)
          .populate('owner')
          .exec()
        , this.project.countDocuments(query).exec()
      ]);

      console.log('projects',projects)

      return {
        data: projects.map((item) => new ProjectDto(item)),
        pagination: {
          page, limit, total
        }
      }
    }

    async findOne(id: string): Promise<ProjectDto> {
      const project = await this.project.findById(id).populate('owner').exec()
      if (!project) {
        throw new NotFoundException('Project Not Found')
      }
      return new ProjectDto(project)
    }

    async update(id: string, updateProjectDto: UpdateProjectDto):Promise<ProjectDto> {
      const prev = await this.findOne(id)

      const { ...safeUpdateData } = updateProjectDto;

      const allowedUpdate = {};
      const allowedFields = ['title', 'description', 'status'];

      allowedFields.forEach(field => {
        if (updateProjectDto[field] !== undefined) {
          allowedUpdate[field] = updateProjectDto[field]
        }
      })

      const updateProject = await this.project.findByIdAndUpdate(id, { $set: allowedUpdate })
      return await this.findOne(id);
    }

    async remove(id: string): Promise<void> {
      const pre = await this.findOne(id)
      //remove the project
      const projectRemove = await this.project.deleteOne({ _id: id });
    }
  }

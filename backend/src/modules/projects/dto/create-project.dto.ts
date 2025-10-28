import { OmitType } from "@nestjs/mapped-types";
import { ProjectDto } from "./project.dto";

export class CreateProjectDto extends OmitType(ProjectDto, ['id','owner'] as const){}
import { Controller, Delete, Get, Injectable, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { TasksService } from "./tasks.service";

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    
    constructor(private TasksService: TasksService) {}

    @Get()
    async findAll(@Req() request: any) {
        return await this.TasksService.findAllByUser(request.user.id);
    }

    @Get(':id')
    async findOne(@Req() request: any) {
        return await this.TasksService.findOne(request.params.id);
    }

    @Post()
    async create(@Req() request: any) {
        return await this.TasksService.create(request.body);
    }

    @Patch(':id')
    async update(@Req() request: any) {
        return await this.TasksService.update(request.params.id, request.body);
    }

    @Delete(':id')
    async remove(@Req() request: any) {
        return await this.TasksService.remove(request.params.id);
    }

}
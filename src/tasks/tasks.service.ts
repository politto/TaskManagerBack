import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tasks } from "./entities/tasks.entity";
import { createAndUpdateTask } from "./dto/createAndUpdateTask.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Tasks)
        private tasksModel: typeof Tasks,

        private authService: AuthService,
    ) {}

    async create(createTaskDto: createAndUpdateTask): Promise<Tasks> {

        return await this.tasksModel.create({
            ...createTaskDto,

        });
    }

    async findAll(): Promise<Tasks[]> {
        return await this.tasksModel.findAll();
    }

    async findAllByUser(id: string): Promise<Tasks[]> {
        return await this.tasksModel.findAll({ where: { userId: id } });
    }

    async findOne(id: string): Promise<Tasks | null> {
        return await this.tasksModel.findOne({ where: { id } });
    }

    async update(id: string, updateTaskDto: createAndUpdateTask): Promise<[number]> {
        return await this.tasksModel.update(updateTaskDto, { where: { id } });
    }

    async remove(id: string): Promise<void> {
        const task = await this.findOne(id);
        if (!task) {
            throw new Error('Task not found');
        }
        await task.destroy();
    }
}
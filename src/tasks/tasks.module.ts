import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tasks } from "./entities/tasks.entity";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { UserModule } from "src/users/user.module";

@Module({
    imports:  [SequelizeModule.forFeature([Tasks]), UserModule],
    controllers: [TasksController],
    providers: [TasksService, AuthService, AuthGuard]
})

export class TasksModule {}
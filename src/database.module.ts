import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./users/entities/users.entity";
import { Tasks } from "./tasks/entities/tasks.entity";

@Module({
    imports: [
        SequelizeModule.forRootAsync({
              useFactory: () => ({
                dialect: 'postgres',
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT?? '3306'),
              username: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
              models: [Users, Tasks],
              synchronize: true,
              autoLoadModels: true,
              })
            })
    ],
})
export class DatabaseModule {}
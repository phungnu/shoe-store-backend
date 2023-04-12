import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			// port: 3306,
			username: 'root',
			password: 'root',
			database: 'thuctapcoso',
			entities: [Task, User],
			synchronize: true,
		}),
		TaskModule,
		UserModule
	],
	controllers: [
		AppController
	],
	providers: [AppService],
})
export class AppModule {}


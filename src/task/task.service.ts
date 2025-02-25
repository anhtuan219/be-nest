import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [];

  create(createTaskDto: CreateTaskDto) {
    this.tasks.push(createTaskDto);
    return this.tasks;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  testError() {
    const e = new Error('Test error exception');
    throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR, {
      cause: e,
    });
  }
}

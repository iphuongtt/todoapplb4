import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { TodoList } from '../models';
import { TodoListRepository } from '../repositories';

export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository: TodoListRepository,
  ) { }

  @post('/todo-list', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: { 'application/json': { schema: getModelSchemaRef(TodoList) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, { exclude: ['id'] }),
        },
      },
    })
    todoList: Omit<TodoList, 'id'>,
  ): Promise<TodoList> {
    return this.todoListRepository.create(todoList);
  }

  @get('/todo-list/count', {
    responses: {
      '200': {
        description: 'TodoList model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where<TodoList>,
  ): Promise<Count> {
    return this.todoListRepository.count(where);
  }

  @get('/todo-list', {
    responses: {
      '200': {
        description: 'Array of TodoList model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(TodoList) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodoList)) filter?: Filter<TodoList>,
  ): Promise<TodoList[]> {
    return this.todoListRepository.find(filter);
  }

  @patch('/todo-list', {
    responses: {
      '200': {
        description: 'TodoList PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, { partial: true }),
        },
      },
    })
    todoList: TodoList,
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where<TodoList>,
  ): Promise<Count> {
    return this.todoListRepository.updateAll(todoList, where);
  }

  @get('/todo-list/{id}', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: { 'application/json': { schema: getModelSchemaRef(TodoList) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TodoList> {
    return this.todoListRepository.findById(id);
  }

  @patch('/todo-list/{id}', {
    responses: {
      '204': {
        description: 'TodoList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, { partial: true }),
        },
      },
    })
    todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.updateById(id, todoList);
  }

  @put('/todo-list/{id}', {
    responses: {
      '204': {
        description: 'TodoList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.replaceById(id, todoList);
  }

  @del('/todo-list/{id}', {
    responses: {
      '204': {
        description: 'TodoList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}

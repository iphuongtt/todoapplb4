import { DefaultCrudRepository, repository, BelongsToAccessor, InclusionResolver } from '@loopback/repository';
import { Todo, TodoRelations, TodoList } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TodoListRepository } from './todo-list.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
  > {

  public readonly todoList: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(Todo, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter);
    const todoListResolver: InclusionResolver<Todo, TodoList> = async todos => {
      const todoLists = [];

      for (const todo of todos) {
        const todoList = await this.todoList(todo.id);
        todoLists.push(todoList);
      }
      console.log(todoLists)
      return todoLists;
    };

    this.registerInclusionResolver('todoList', todoListResolver);
  }
}

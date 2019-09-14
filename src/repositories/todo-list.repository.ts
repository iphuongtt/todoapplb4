import { DefaultCrudRepository, repository, HasManyRepositoryFactory, Repository } from '@loopback/repository'
import { inject, Getter } from '@loopback/core'
import { TodoList, TodoListRelations, TodoListWithRelations, Todo } from '../models'
import { DbDataSource } from '../datasources'
import { TodoRepository } from './todo.repository'

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
  > {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource)
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter)
  }
}

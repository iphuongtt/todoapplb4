import { Entity, model, property, hasMany } from '@loopback/repository';
import { Todo, TodoWithRelations } from './todo.model';

@model({ settings: {} })
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  todos?: TodoWithRelations[]
}

export type TodoListWithRelations = TodoList & TodoListRelations;

import { Entity, model, property, belongsTo } from '@loopback/repository';
import { TodoList, TodoListWithRelations } from './todo-list.model';

@model({ settings: {} })
export class Todo extends Entity {
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
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property({
    type: 'string',
  })
  remindAtAddress?: string

  @property({
    type: 'string'
  })
  remindAtGeo?: string

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
}

export type TodoWithRelations = Todo & TodoRelations;

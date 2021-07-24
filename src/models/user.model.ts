import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  FirstName?: string;

  @property({
    type: 'string',
  })
  MiddleName?: string;

  @property({
    type: 'string',
  })
  LastName?: string;

  @property({
    type: 'string',
  })
  Email?: string;

  @property({
    type: 'string',
  })
  PhoneNumber?: string;

  @property({
    type: 'string',
  })
  Role?: string;

  @property({
    type: 'string',
  })
  Address?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

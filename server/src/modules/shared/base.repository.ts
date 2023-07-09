import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IRepository } from './repository.interface';

export abstract class BaseRepository<T extends BaseEntity>
  implements IRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}
  findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  create(data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

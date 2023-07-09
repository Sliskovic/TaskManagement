import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}

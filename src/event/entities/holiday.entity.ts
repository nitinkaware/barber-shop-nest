import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column({ type: 'date' })
  public date: Date;
}

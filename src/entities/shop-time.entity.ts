import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopTime {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public day: string;

  @Column()
  public opensAt: string;

  @Column()
  public closesAt: string;
}

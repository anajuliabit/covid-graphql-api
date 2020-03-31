import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, Int, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  cases: number;

  @Field(() => Int)
  @Column()
  todayCases: number;

  @Field(() => Int)
  @Column()
  deaths: number;

  @Field(() => Int)
  @Column()
  todayDeaths: number;

  @Field(() => Int)
  @Column()
  recovered: number;

  @Field(() => Int)
  @Column()
  active: number;
}

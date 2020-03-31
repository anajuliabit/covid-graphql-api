import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CountryInput {
  @Field()
  name: string;

  @Field(() => Int)
  cases: number;

  @Field(() => Int)
  todayCases: number;

  @Field(() => Int)
  deaths: number;

  @Field(() => Int)
  todayDeaths: number;

  @Field(() => Int)
  recovered: number;

  @Field(() => Int)
  active: number;
}

import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Int,
  InputType,
  Query
} from "type-graphql";
import { Country } from "src/entity/Country";

@InputType()
class CountryInput {
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

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  books() {
    return Country.find();
  }

  @Mutation(() => Country)
  async createMovie(@Arg("options", () => CountryInput) options: CountryInput) {
    const movie = await Country.create(options).save();
    return movie;
  }
}

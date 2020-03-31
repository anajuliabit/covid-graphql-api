import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Country } from '../entity/Country';
import { CountryInput } from '../model/Country';

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.findOne();
  }

  @Mutation(() => Country)
  async createCountryData(@Arg('options', () => CountryInput) options: CountryInput) {
    return await Country.create(options).save();
  }
}

import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Country } from '../entity/Country';
import { CountryInput } from '../model/Country';

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.find({
      order: {
        cases: 'DESC',
      },
    });
  }

  @Mutation(() => Country)
  async createCountryData(@Arg('options', () => CountryInput) options: CountryInput) {
    return await Country.create(options).save();
  }

  @Query(() => Country)
  async getOne(@Arg('name') name: string) {
    return Country.findOne({ where: { name } });
  }
}

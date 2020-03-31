# Covid GraphQL API

GraphQL API for current cases and more stuff about COVID-19 worldwide.

- This project is a Concept Proof to test graphql usage in Javascript.
- I used [TypeORM](https://typeorm.io/#/) to map the objects and [TypegraqhQL](https://github.com/MichalLytek/type-graphql) to facilitate the manipulation of the schemas.
- All communication with this API is done by [Apollo](https://www.apollographql.com/docs/apollo-server/) Server.

## Installation

- Run `yarn`
- Run `yarn start`

## Usage example

Go to `http://localhost:3000/graphql` (optional: set the port on enviromnent variables )

```
{
  countries {
    id
    name
    cases
    todayCases
    deaths
    todayDeaths
    recovered
    active

  }
}
```

## Todo

- [ ] Order by cases
- [ ] Filter by country name

## Contributions

Contributions are welcome!

1. Fork it (https://github.com/anajuliabit/covid-graphql-api/fork)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

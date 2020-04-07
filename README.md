# Covid GraphQL API

GraphQL API for current cases about COVID-19 worldwide.

- This project is a Concept Proof to test graphql usage in Typescript.
- I used [TypeORM](https://typeorm.io/#/) to map the objects and [TypegraqhQL](https://github.com/MichalLytek/type-graphql) to facilitate the manipulation of the schemas.
- All communication with this API is done by [Apollo](https://www.apollographql.com/docs/apollo-server/) Server.

## Installation

- Run `yarn`
- Run `yarn start`

## Usage example

Go to `http://localhost:3000/playground` (optional: set the port on enviromnent variables )

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

## Voyager
You can see GraphQL API as an interactive graph `http://localhost:3000/voyager` (optional: set the port on enviromnent variables )

## Todo

- [x] Order by cases

## Data source

The used API to extract data was developed by [WorldOMeters](https://www.worldometers.info/coronavirus/#countries)

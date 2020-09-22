import { ApolloServer, gql } = require("apollo-server");
const axios = require("axios")

const typeDefs = gql `
  type: Location {
    Countries [
      {
        Country: String
        NewConfirmed: Int
        TotalConfirmed: Int
        NewDeaths: Int
        TotalDeaths: Int
        NewRecovered: Int
        TotalRecovered: Int
        Date: String
      }
    ]
  }

  type Query {
    locations: [Location]
  }
`;

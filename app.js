const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios")

const typeDefs = gql `
  type Location {
    Country: String
    NewConfirmed: Int
    TotalConfirmed: Int
    NewDeaths: Int
    TotalDeaths: Int
    NewRecovered: Int
    TotalRecovered: Int
    Date: String
  }

  type Query {
    locations: [Location]
  }
`;

const resolvers = {
  Query: {
    locations: async () => {
      try {
        const locations = await axios.get("https://api.covid19api.com/summary");

        return locations.data.Countries.map(({ Country, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Date }) => ({
          Country,
          NewConfirmed,
          TotalConfirmed,
          NewDeaths,
          TotalDeaths,
          NewRecovered,
          TotalRecovered,
          Date
        }))
      } catch (error) {
        throw error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
.then(({ url }) => console.log(`The Server Is Running At ${url}`));

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './App.css';

const GET_LOCATIONS = gql `
  {
    locations {
      Country
      NewConfirmed
      TotalConfirmed
      NewDeaths
      TotalDeaths
      NewRecovered
      TotalRecovered
      Date
    }
  }
`;

const Location = ({ location: { Country, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Date } }) => (
  <div>
    <div>
      <h1>{Country}</h1>
    </div>
    <div>
      <h3>New Cases Confirmed: {NewConfirmed}</h3>
      <h3>Total Cases Confirmed: {NewConfirmed}</h3>
      <h3>Date: {Date}</h3>
    </div>
  </div>
)

const refreshPage = () => {
  window.location.reload(false);
}

const App = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if(error) return (
    <div>
      <h1>An Error Occurred Please Click Button Below To Refresh Page:</h1>
      <button onClick={refreshPage}>Refresh</button>
    </div>
  )

  if(loading) return <h1>Loading...</h1>

  return (
    <main>
      <h1>Covid-19 Data</h1>
      {
        data.locations.map((location, index) => (
          <Location key={index} location={location} />
        ))
      }
    </main>
  )
}

export default App;

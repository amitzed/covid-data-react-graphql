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
  <div className="ui card">
    <div className="content">
      <div className="header">{Country}</div>
    </div>
    <div className="content card-case-stats">
      <h4 className="ui sub header">As Of: <span>{Date}</span></h4>
      <h4 className="ui sub header">New Cases Confirmed: <span>{NewConfirmed}</span></h4>
      <h4 className="ui sub header">Total Cases Confirmed: <span>{TotalConfirmed}</span></h4>
      <h4 className="ui sub header">New Deaths: <span>{NewDeaths}</span></h4>
      <h4 className="ui sub header">Total Deaths: <span>{TotalDeaths}</span></h4>
      <h4 className="ui sub header">Newly Recovered: <span>{NewRecovered}</span></h4>
      <h4 className="ui sub header">Total Recovered: <span>{TotalRecovered}</span></h4>
    </div>
  </div>
);

const refreshPage = () => {
  window.location.reload(false);
}

const App = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if(error) return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <i className="hand point down outline icon"></i>
        An Error Occurred Please Click Button Below To Refresh Page:
      </div>
      <div className="inline">
        <div onClick={refreshPage} className="positive ui button massive">Refresh</div>
      </div>
    </div>
  );

  if(loading) return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <button className="ui primary loading button massive">Loading...</button>
        <h1>Loading...</h1>
      </div>
    </div>
  );

  return (
    <main id="wrapper" className="ui">
      <h2 className="ui center aligned icon header">
        <i className="circular user md icon header-icon"></i>
        <span className="header-content">Covid-19 Worldwide Data Tracker</span>
        <br />
        <em className="header-content">*Updated Daily</em>
      </h2>
      {
        data.locations.map((location, index) => (
          <Location key={index} location={location} />
        ))
      }

      <h2 className="ui center aligned icon header footer">
        <div className="content">
          <a href="#wrapper">Back to Top</a>
        </div>
      </h2>

    </main>
  )
}

export default App;

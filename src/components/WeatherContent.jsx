import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCity, findUsersCityTemperature } from '../utils';
import { Location } from './Location';

const WeatherContent = ({ latestItem }) => {

  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    if (latestItem) {
      setCurrentCity(latestItem);
    } else {
      findUsersCityTemperature().then((res) => {
        if (res) {
          setCurrentCity(res.payload);
        } else {
          fetchCity('London').then((res) => {
            setCurrentCity(res.payload);
          });
        }
      })
    }
  }, [latestItem]);

  return (
    <>
      <h4 className="logo">weather.app</h4>
      <Col xs={8} className="content">
        {currentCity && (
          <Location item={currentCity}/>
        )}
      </Col>
    </>
  )
}

function mapState({ cities }) {
  return {
    latestItem: cities.latestItem,
  }
}

const mapDispatch = {
  fetchCity,
};

export default connect(
  mapState,
  mapDispatch,
)(WeatherContent)

import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCity, findUsersCityTemperature } from '../utils';
import { Location } from './Location';
import {APP_NAME, DEFAULT_CITY} from "../constants";

const WeatherContent = ({ latestItem, findUsersCityTemperature, fetchCity, units }) => {
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (latestItem) return;

      const city = await findUsersCityTemperature();
      if (!isMounted) return;

      if (!city) {
        try {

          await fetchCity(DEFAULT_CITY);
        } catch (e) {
          console.error('Failed to fetch default city:', e);
        }
      }
    };

    init().then(r => console.log(r));

    return () => {
      isMounted = false;
    };
  }, [latestItem, findUsersCityTemperature, fetchCity]);

  return (
    <>
      <h4 className="logo">{APP_NAME}</h4>
      <Col xs={8} className="content">
        {latestItem ? (
          <Location item={latestItem} units={units} />
        ) : (
          <div className="text-muted" style={{ padding: 24 }}>
            Type a city to begin.
          </div>
        )}
      </Col>
    </>
  );
};

function mapState({ cities, units }) {
  return {
    latestItem: cities.latestItem,
    units,
  };
}

const mapDispatch = {
  fetchCity,
  findUsersCityTemperature,
};

export default connect(
  mapState,
  mapDispatch,
)(WeatherContent);

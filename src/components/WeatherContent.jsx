import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchCity, findUsersCityTemperature } from '../utils';
import { Location } from './Location';

const WeatherContent = ({ latestItem, findUsersCityTemperature, fetchCity }) => {
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (latestItem) return;

      const city = await findUsersCityTemperature();
      if (!isMounted) return;

      if (!city) {
        try {
          await fetchCity('London');
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
      <h4 className="logo">weather.app</h4>
      <Col xs={8} className="content">
        {latestItem && (
          <Location item={latestItem} />
        )}
      </Col>
    </>
  );
};

function mapState({ cities }) {
  return {
    latestItem: cities.latestItem,
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

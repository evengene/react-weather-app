import React from 'react';
import { connect } from 'react-redux';
import {Col, Container, Row} from "react-bootstrap";

import CitySearch from './CitySearch';
import CityList from './CityList';
import WeatherContent from './WeatherContent';
import {UnitsSwitcher} from "./UnitsSwitcher";

import { getWeatherBackgroundClass } from '../utils/getWeatherBackgroundClass';

import '../styles/global.scss';



export const WeatherApp = ({ latestItem }) => {
  const bgClass = getWeatherBackgroundClass(latestItem);

  return (
      <Container fluid className={`root h-100 ${bgClass}`}>
      <Row className="justify-content-end">
        <WeatherContent/>
        <Col xs={4} className="sidebar d-flex flex-column">
          <CitySearch/>
          <CityList/>
          <div className="mt-auto">
            <UnitsSwitcher/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function mapState({ cities }) {
  return {
    latestItem: cities.latestItem,
  };
}

export default connect(mapState)(WeatherApp);
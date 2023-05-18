import React from 'react';
import CitySearch from './CitySearch';
import CityList from './CityList';
import WeatherContent from './WeatherContent';
import {Col, Container, Row} from "react-bootstrap";
import '../styles/global.scss';

export const WeatherApp = () => {
  return (
    <Container fluid className="root h-100">
      <Row className="justify-content-end">
        <WeatherContent/>
        <Col xs={4} className="sidebar">
          <CitySearch/>
          <CityList/>
        </Col>
      </Row>
    </Container>
  );
}
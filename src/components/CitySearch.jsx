import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import { changeCityName } from '../redux/actions';
import { withChange } from '../helpers';
import { fetchCity } from '../utils';


const CitySearch = (props) => {
  const { cityName, changeCityName, fetchCity } = props;


  return (
    <div className="mx-auto w-full">
      <div className="search-group">
        <input
          type="text"
          name="search"
          id="search"
          className="search-input"
          value={cityName}
          onChange={withChange(changeCityName)}
          placeholder="Enter city name"
        />
        <Button
          onClick={partial(fetchCity, cityName)}
          variant="primary"
          className="search-button"
        >
          Search
        </Button>
      </div>
    </div>
  )
}

function mapState({ cityName }) {
  return {
    cityName,
  }
}

export default connect(
  mapState,
  { changeCityName, fetchCity },
)(CitySearch)
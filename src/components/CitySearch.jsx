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
          placeholder="Search by City"
        />
        <Button
          onClick={partial(fetchCity, cityName)}
          variant="primary"
        >
          Add City
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
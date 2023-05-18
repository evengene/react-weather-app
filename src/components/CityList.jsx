import React from 'react';
import {connect} from 'react-redux';

import CityItem from './CityItem';
import { clearItem, updateLatestItem } from '../redux/actions';

function CityList({list, clearItem, updateLatestItem}) {

  const onCityClick = (city) => {
    updateLatestItem(city);
  };

  const onClearItem = (id) => {
    clearItem(id);
  }

  return (
    <div className="city-list">
      {list?.map(city => (
        <CityItem key={city.id} city={city} clearItem={onClearItem} onSelectCity={onCityClick}/>
      ))}
    </div>
  )
}

function mapState({cities}) {
  return {
    list: cities.list,
  }
}

const mapDispatch = {
  clearItem, updateLatestItem
};

export default connect(
  mapState,
  mapDispatch,
)(CityList)
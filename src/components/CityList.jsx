import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CityItem from './CityItem';
import { clearItem, updateLatestItem } from '../redux/actions';

function CityList({ list, clearItem, updateLatestItem, latestItem }) {

  const [cities, setCities] = useState([]);

  const onCityClick = (city) => {
    updateLatestItem(city);
  };

  const onClearItem = (id) => {
    clearItem(id);
  }

  useEffect(() => {
    const citiesFromStorage = JSON.parse(localStorage.getItem('citiesMine')) || [];
    if (citiesFromStorage.length > 0) {
      setCities(citiesFromStorage);
    } else {
      setCities(list);
    }
  }, [list]);

  return (
    <div className="city-list">
      {cities?.map(city => (
        <CityItem key={city.id} city={city} clearItem={onClearItem} onSelectCity={onCityClick}/>
      ))}
    </div>
  )
}

function mapState({ cities }) {
  return {
    list: cities.list,
    latestItem: cities.latestItem,
  }
}

const mapDispatch = {
  clearItem, updateLatestItem
};

export default connect(
  mapState,
  mapDispatch,
)(CityList)
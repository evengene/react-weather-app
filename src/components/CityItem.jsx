import React from 'react';

const CityItem = (props) => {
  const { city, clearItem, onSelectCity } = props;

  if (!city) return null;

  const onCityClick = () => {
    onSelectCity(city);
  }

  const onClearItem = () => {
    clearItem(city.id);
  }

  return (
    <div className="city-link">
      <button className="city-link__button" type="button" onClick={onCityClick}>{city.name}</button>
      <button type="button" onClick={onClearItem} className="close-button">
        x
      </button>
    </div>
  )
}

export default CityItem;
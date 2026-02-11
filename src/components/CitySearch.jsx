import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeCityName } from '../redux/actions';
import { withChange } from '../helpers';
import { fetchCity } from '../utils';

const CitySearch = (props) => {
  const { cityName, changeCityName, fetchCity } = props;

  const [error, setError] = useState(null);

  const onSearch = async () => {
    const trimmed = cityName?.trim() ?? '';
    if (!trimmed) return;

    try {
      setError(null);
      await fetchCity(trimmed);
    } catch (e) {
      setError(e?.message || 'Something went wrong');
    }
  };

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder="Enter city name"
        />
        <Button
          onClick={onSearch}
          variant="primary"
          className="search-button"
          disabled={!cityName?.trim()}
        >
          Search
        </Button>
      </div>

      {error && (
        <Alert className="mt-2" variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
};

function mapState({ cityName }) {
  return {
    cityName,
  };
}

export default connect(
  mapState,
  { changeCityName, fetchCity },
)(CitySearch);
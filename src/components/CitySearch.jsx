import React, { useState } from 'react';
import { Alert, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeCityName, setUnits } from '../redux/actions';
import { withChange } from '../helpers';
import { fetchCity } from '../utils';
import {IMPERIAL_UNITS, METRIC_UNITS} from "../constants";

const CitySearch = (props) => {
  const { cityName, changeCityName, fetchCity, units, setUnits } = props;

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
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="text-white">Units</div>
        <ButtonGroup>
          <ToggleButton

            id="units-f"
            type="radio"
            variant="outline-light"
            name="units"
            value={IMPERIAL_UNITS}
            checked={units === IMPERIAL_UNITS}
            onChange={() => setUnits(IMPERIAL_UNITS)}
            size="sm"

          >
            ℉
          </ToggleButton>
          <ToggleButton
            id="units-c"
            type="radio"
            variant="outline-light"
            name="units"
            value={METRIC_UNITS}
            checked={units === METRIC_UNITS}
            onChange={() => setUnits(METRIC_UNITS)}
            size="sm"
          >
            ℃
          </ToggleButton>
        </ButtonGroup>
      </div>

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

function mapState({ cityName, units }) {
  return {
    cityName,
    units,
  };
}

export default connect(
  mapState,
  { changeCityName, fetchCity, setUnits },
)(CitySearch);
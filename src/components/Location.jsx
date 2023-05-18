import { Col } from 'react-bootstrap';
import React, { useMemo } from 'react';

const degreeSign = '℉';

export const Location = (props) => {
  const { item } = props;

  const { name, temp, timezone } = item;

  const cityTemp = `${temp?.toFixed(0)}${degreeSign}` || '';

  const getCityTimezoneByOffset = (offsetInSecFromUTC) => {
    const offsetInMsFromUTC = offsetInSecFromUTC * 1000;
    const date = new Date(Date.now() + offsetInMsFromUTC);
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', timeZoneName: 'longGeneric', timeZone: 'UTC' };
    return {
      itemTimezone: date.toLocaleString('en', dateOptions),
      itemDate: date.toLocaleString('en', timeOptions),
    };
  }

  const { itemTimezone, itemDate } = useMemo(() => {
    return getCityTimezoneByOffset(timezone);
  }, []);


  return (
    <Col className="details">
      <h3 className="temperature">{cityTemp}</h3>
      <div>
        <h4 className="name">{name}</h4>
        {itemTimezone && itemDate && (
          <p className="timezone">{itemTimezone} - {itemDate}</p>
        )}
      </div>
    </Col>
  )
}
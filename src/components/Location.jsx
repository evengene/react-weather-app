import { Col } from 'react-bootstrap';
import React, { useMemo } from 'react';

const getDegreeSign = (units) => (units === 'metric' ? '℃' : '℉');

const getIconUrl = (icon) =>
  icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

export const Location = (props) => {
  const { item, units } = props;

  const { name, temp, timezone, icon, condition } = item;

  const degreeSign = getDegreeSign(units);
  const cityTemp = typeof temp === 'number' ? `${temp.toFixed(0)}${degreeSign}` : '—';
  const iconUrl = getIconUrl(icon);

  const getCityTimezoneByOffset = (offsetInSecFromUTC) => {
    const offsetInMsFromUTC = offsetInSecFromUTC * 1000;
    const date = new Date(Date.now() + offsetInMsFromUTC);
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', timeZoneName: 'longGeneric', timeZone: 'UTC' };
    return {
      itemTimezone: date.toLocaleString('en', dateOptions),
      itemDate: date.toLocaleString('en', timeOptions),
    };
  };

  const { itemTimezone, itemDate } = useMemo(() => {
    return getCityTimezoneByOffset(timezone);
  }, [timezone]);

  return (
    <Col className="details">
      {iconUrl && (
        <img
          src={iconUrl}
          alt={condition ? `${condition} icon` : 'Weather icon'}
          width={72}
          height={72}
          style={{ marginBottom: 18 }}
        />
      )}

      <h3 className="temperature">{cityTemp}</h3>

      <div>
        <h4 className="name">{name}</h4>

        {condition && (
          <div className="text-white-50" style={{ fontSize: 16 }}>
            {condition}
          </div>
        )}

        {itemTimezone && itemDate && (
          <p className="timezone">{itemTimezone} - {itemDate}</p>
        )}
      </div>
    </Col>
  );
};
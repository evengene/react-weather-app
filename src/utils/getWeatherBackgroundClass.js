const isNightFromIcon = (icon) => typeof icon === 'string' && icon.endsWith('n');

const ATMOSPHERE = new Set([
  'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado',
]);

export const getWeatherBackgroundClass = (city) => {
  if (!city || typeof city !== 'object') return 'bg-default';

  const night = isNightFromIcon(city.icon);
  const condition = city.condition;

  const base =
    condition === 'Clear' ? 'clear' :
    condition === 'Clouds' ? 'clouds' :
    condition === 'Rain' || condition === 'Drizzle' ? 'rain' :
    condition === 'Thunderstorm' ? 'storm' :
    condition === 'Snow' ? 'snow' :
    ATMOSPHERE.has(condition) ? 'clouds' : // map “foggy/hazy” to cloudy vibe
    'default';

  return night ? `bg-${base}-night` : `bg-${base}-day`;
};
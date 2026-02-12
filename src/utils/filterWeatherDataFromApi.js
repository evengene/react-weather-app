export const filterWeatherDataFromApi = (response) => {
  if (!response) return null;

  const id = response.id;
  const name = response.name;
  const timezone = response.timezone;
  const temp = response?.main?.temp;

  const condition = response?.weather?.[0]?.main;
  const icon = response?.weather?.[0]?.icon;
  if (id == null || !name || timezone == null || typeof temp !== 'number') {
    return null;
  }

  return {
    id,
    name,
    temp,
    timezone,
    condition: condition || 'Unknown',
    icon: icon || null,
  };
};
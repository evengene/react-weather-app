export const filterWeatherDataFromApi = (response) => {
  if (!response) return null;

  const id = response.id;
  const name = response.name;
  const timezone = response.timezone;
  const temp = response?.main?.temp;

  if (id == null || !name || timezone == null || typeof temp !== 'number') {
    return null;
  }

  return {
    id,
    name,
    temp,
    timezone,
  };
};
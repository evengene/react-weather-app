export const filterWeatherDataFromApi =(response)=> {
  if (!response) return;
  const {id, name, timezone, main} = response;
  const { temp } = main;
  return {
    id,
    name,
    temp,
    timezone
  }
}
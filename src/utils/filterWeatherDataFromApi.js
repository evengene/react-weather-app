export const filterWeatherDataFromApi =(response)=> {
  const {id, name, timezone, main} = response;
  const { temp } = main;
  return {
    id,
    name,
    temp,
    timezone
  }
}
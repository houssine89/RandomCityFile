const fs = require('fs').promises


async function readCityWheatherFile(){
  const a = await fs.readFile('input.txt', 'utf8')
  const data = JSON.parse(a);
  return data;
}

function selectRandomCity(citiesArray){
  const randomIndex = Math.floor(Math.random() * citiesArray.length);
  return citiesArray[randomIndex];
}
/*
function deleteFile(randomCityName){
  fs.unlink(`${randomCityName.name}.txt`)
}
*/

async function fetchTemperature(){
  try{
  const read = await readCityWheatherFile() 
  const randomCityName = selectRandomCity(read);
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${randomCityName.lat}&longitude=${randomCityName.lng}&current_weather=true`);
  const data = await response.json();
  console.log('CityName:', randomCityName.name);
  console.log('Temperature:', data.current_weather.temperature);
  let b = randomCityName.name + ':' + data.current_weather.temperature.toString();
  await fs.writeFile(`${randomCityName.name}.txt`,b);
} catch(error){
  console.log('Error',error.message);
}}
fetchTemperature()



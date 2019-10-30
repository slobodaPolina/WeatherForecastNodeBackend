// this is just a little utilite for me to create a vocabulary from the http://bulk.openweathermap.org/sample/ archive

const fs = require('fs');
var rawData = fs.readFileSync('city.list.json');
var cities = JSON.parse(rawData);
var vocabulary = {};

cities.forEach(city => vocabulary[city.name] = city.id);

let data = JSON.stringify(vocabulary);
fs.writeFileSync('vocabulary.json', data);

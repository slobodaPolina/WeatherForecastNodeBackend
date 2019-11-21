const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();

app.use('/', express.static('dist'));
app.use(bodyParser.json());

app.get('/weather', async function (req, res) {
    res.json(
        axios.get(
            'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?id=' +
                req.query.cityCode + '&appid=c21880c5125c247d642c0e4058a0a704'
        )
    )
});

app.get('/weather/coordinates', async function (req, res) {
    res.json(
        axios.get(
            'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=' +
                req.query.lat + '&lon=' + req.query.lon + '&appid=c21880c5125c247d642c0e4058a0a704'
        )
    )
});

app.get('/favorites', async function (req, res) {
    res.json(db.selectAll());
});

app.post('/favorites', async function (req, res) {
    await db.insert(req.body.name);
});

app.delete('/favorites', async function (req, res) {
    await db.deleteCity(req.body.name);
});

app.listen(8080, '0.0.0.0', () => {
    console.info('Server is up');
});

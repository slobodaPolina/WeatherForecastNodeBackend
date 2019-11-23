const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();

app.use('/', express.static('build'));
app.use(bodyParser.json());

app.get('/weather', async function (req, res) {
	try {
        const result = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather?id=' +
                req.query.cityCode + '&appid=c21880c5125c247d642c0e4058a0a704'
        );
    	res.json(result.data);
	} catch (e) {
		console.error(e);
		res.end();
	}
});

app.get('/weather/coordinates', async function (req, res) {
	try {
        const result = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather?lat=' +
                req.query.lat + '&lon=' + req.query.lon + '&appid=c21880c5125c247d642c0e4058a0a704'
        );
   		res.json(result.data);
	} catch (e) {
		console.error(e);
		res.end();
	}
});

app.get('/favorites', async function (req, res) {
	try {
		res.json(await db.selectAll());
	} catch(e) {
		console.error(e);
		res.end();
	}
});

app.post('/favorites', async function (req, res) {
	try {
    	await db.insert(req.body.name);
	} catch(e) {
		console.error(e);
		res.end();
	}
});

app.delete('/favorites', async function (req, res) {
	try {
		await db.deleteCity(req.body.name);
	} catch(e) {
		console.error(e);
		res.end();
	}
});

app.listen(8080, '0.0.0.0', () => {
    console.info('Server is up');
});

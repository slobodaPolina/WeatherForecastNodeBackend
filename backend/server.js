const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./db.js');

app.use('/', express.static('dist'));
app.use(bodyParser.json());

app.get('/weather', async function (req, res) {
    //get by city
});

app.get('/weather/coordinates', async function (req, res) {
    //get by coordinates
});

app.get('/favorites', async function (req, res) {
    res.json(db.selectAll());
});

app.post('/favorites', async function (req, res) {
    await db.insert(req.body.name);
});

app.delete('/favorites', async function (req, res) {
    await db.delete(req.body.name);
});

app.listen(8080, '0.0.0.0', () => {
    console.info('Server is up');
});

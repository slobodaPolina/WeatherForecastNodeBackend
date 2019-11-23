const mongoose = require('mongoose');

let FavoriteCity;

mongoose.connect(
    'mongodb://127.0.0.1:27017/polina',
    { useNewUrlParser: true, user: "polina", pass: "1234" }
).then(() => {
    FavoriteCity = mongoose.model(
        'FavoriteCity',
        new mongoose.Schema(
            { _id: String },
            { collection: 'favorites' }
        )
    );
});

async function insert(name) {
    if (name === "") {
        return;
    }
    await new FavoriteCity({ _id: name }).save();
}

async function deleteCity(name) {
    await FavoriteCity.deleteOne({ _id: name });
}

async function selectAll() {
    return new Promise((resolve, reject) => {
        FavoriteCity.find((err, favorites) => {
            if (err) {
		        console.error(err);
                reject(err);
            }
            resolve(favorites);
        });
    })
}

module.exports = {
    insert,
    deleteCity,
    selectAll
};

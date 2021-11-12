const fs = require('fs');

const axios = require('axios');

class Search {
    history = [];
    pathDB = './db/database.json';

    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    //this method returns coincidences of a given city name
    async searchLocation(location = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map(location => ({
                id: location.id,
                name: location.place_name,
                lng: location.center[0],
                lat: location.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async locationWeather(lat, lon) {
        try {

            //axios instance
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            });

            //retrieving data
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
            }

        } catch (error) {
            console.log(error);
        }
    }

    historyAdd(location = '') {
        //prevent duplicate values
        if (this.history.includes(location)) {
            return;
        }
        
        this.history = this.history.splice(0,5);
        this.history.unshift(location);

        //write in json file
        this.writeDB();
    }

    writeDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.pathDB, JSON.stringify(payload));
    }

    readDB() {
        if (!fs.existsSync(this.pathDB)) return;

        const info = fs.readFileSync(this.pathDB, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.history = data.history;
    }

}

module.exports = Search;
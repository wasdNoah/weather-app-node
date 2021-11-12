const axios = require('axios');

class Search {
    history = ['Madrid', 'Los Angeles', 'San Jose'];

    constructor() {
        //TODO: read DB if it exists
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
            const {weather, main} = resp.data;

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
}

module.exports = Search;
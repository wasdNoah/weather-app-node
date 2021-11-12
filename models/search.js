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

    //this method returns coincidences of a given city name
    async searchCity(city = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            console.log(resp.data);

        } catch (error) {
            return [];
        }



        return [];
    }
}

module.exports = Search;
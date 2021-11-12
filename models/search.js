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
}

module.exports = Search;
class Search {
    history = ['Madrid', 'Los Angeles', 'San Jose'];

    constructor () {
        //TODO: read DB if it exists
    }

    //this method returns coincidences of a given city name
    async searchCity (city = '') {
        console.log(city);

        return []; //return coincidences
    }
}

module.exports = Search;
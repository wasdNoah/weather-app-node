require('dotenv').config();

const { readInput, mainMenu, pause, listLocations } = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {

    const search = new Search();
    let opt;

    do {

        opt = await mainMenu();
        console.log(`Selected option: ${opt}`);

        switch (opt) {
            case 1: //search by locations's name

                //display message
                const city = await readInput('Type city\'s name: ');

                //search locations
                const locations = await search.searchLocation(city);

                //select a location
                const id = await listLocations(locations);

                //if user selects 0 it should cancel
                if (id === 0) {
                    continue
                }

                const selected_location = locations.find(loc => loc.id === id);
                //write in db
                search.historyAdd(selected_location.name);

                const weather_details = await search.locationWeather(selected_location.lat, selected_location.lng);

                //display results
                console.clear();
                console.log('\n-------- Location info -------\n'.green);
                console.log('City/location: ', selected_location.name.green);
                console.log('Lat: ', selected_location.lat);
                console.log('Lng: ', selected_location.lng);
                console.log('Temperature: ', weather_details.temp);
                console.log('Min temperature: ', weather_details.temp_min);
                console.log('Max temperature: ', weather_details.temp_max);
                console.log('Looking like', weather_details.desc.green);

                break;

            case 2:
                search.history.forEach((location, i) => {
                    const idx = `${i + 1}.`.green;
                    
                    console.log(`${idx} ${location}`);
                })

                break;
        }

        await pause();

    } while (opt !== 0)
}

main();
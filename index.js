require('dotenv').config();

const { readInput, mainMenu, pause, listLocations } = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
    
    const search = new Search();
    let opt;

    do {

        opt =  await mainMenu();
        console.log(`Selected option: ${opt}`);

        switch (opt) {
            case 1: //search by city's name

                //display message
                const city = await readInput('Type city\'s name: ');
                
                //search locations
                const locations = await search.searchLocation(city);

                //select a location
                const id = await listLocations(locations);
                const selected_location = locations.find(loc => loc.id === id);
            
                console.log('\n Location info \n'.green);
                console.log('City/location: ', selected_location.name);
                console.log('Lat: ', selected_location.lat);
                console.log('Lng: ', selected_location.lng);
                // console.log('Temperature', );
                // console.log('Min: ', );
                // console.log('Max: ', );
                
                break;
        }
        
        await pause();

    } while (opt !== 0)
}

main();
const { readInput, mainMenu, pause } = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
    
    const search = new Search();
    let opt;

    do {

        opt =  await mainMenu();
        console.log(`Selected option: ${opt}`);

        switch (opt) {
            case 1: //search by city's name

                const city = await readInput('Type city\'s name: ');
                console.log(city);
            
                console.log('\nCity data: \n'.green);
                console.log('City: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperature', );
                console.log('Min: ', );
                console.log('Max: ', );
                
                break;
        }
        
        await pause();

    } while (opt !== 0)
}

main();
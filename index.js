const { readInput, mainMenu, pause } = require("./helpers/inquirer")

const main = async () => {
    let opt;

    do {

        opt =  await mainMenu();
        console.log(`Selected option: ${opt}`);
        
        await pause();

    } while (opt !== 0)
}

main();
const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search by city`
            },
            {
                value: 2,
                name: `${'2.'.green} Search history`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
];

const mainMenu = async () => {
    console.clear();
    console.log('==============================='.green);
    console.log('       Select an option'.white);
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Please, press ${'ENTER'.green} to continue...`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a valid value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

//receives an array with the coincidences
const listLocations = async (locations = []) => {

    const choices = locations.map((location, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: location.id,
            name: `${idx} ${location.name}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a location',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

module.exports = {
    mainMenu,
    pause,
    readInput,
    confirm,
    listLocations
}
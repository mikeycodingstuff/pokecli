import inquirer from "inquirer"

const initialPrompt = async () => {
    const answers = await inquirer.prompt({
        name: 'initial_question',
        type: 'list',
        message: 'What would you like to do?\n',
        choices: [
            'Get a random pokemon.',
            'Quit',
        ]
    })

    switch (answers.initial_question) {
        case 'Get a random pokemon.':
            whichRandomPokemon()
            break
        case 'Quit':
            console.log('Quitting')
            process.exitCode = 0;
            break
    }
}

const whichRandomPokemon = async () => {
    const answers = await inquirer.prompt({
        name: 'which_random_pokemon',
        type: 'list',
        message: 'Which pokemon would you like to select from?\n',
        choices: [
            'All current pokemon.',
            'Original 151 pokemon.',
            'Quit',
        ]
    })

    switch (answers.which_random_pokemon) {
        case 'All current pokemon.':
            console.log('random from all pokemon')
            break
        case 'Original 151 pokemon.':
            console.log('random from original pokemon')
            break
        case 'Quit':
            console.log('Quitting')
            process.exitCode = 0;
            break
    }
}

export { initialPrompt, whichRandomPokemon }
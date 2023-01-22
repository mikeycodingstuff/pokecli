import inquirer from "inquirer"
import { getRandomPokemon, allCurrentPokemons, originalPokemons } from './utilities/fetches/getRandomPokemon.js'
import formatResults from "./utilities/formatResults.js"

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

    let fetchedPokemon

    switch (answers.which_random_pokemon) {

        case 'All current pokemon.':
            fetchedPokemon = await getRandomPokemon(allCurrentPokemons)
            formatResults(fetchedPokemon)
            break
        case 'Original 151 pokemon.':
            fetchedPokemon = await getRandomPokemon(originalPokemons)
            formatResults(fetchedPokemon)
            break
        case 'Quit':
            process.exitCode = 0;
            break
    }
}

export { initialPrompt, whichRandomPokemon }

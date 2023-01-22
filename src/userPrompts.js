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
            'Get a specific pokemon.',
            'Quit',
        ]
    })

    switch (answers.initial_question) {
        case 'Get a random pokemon.':
            rangePrompt()
            break
        case 'Get a specific pokemon.':
            searchMethodPrompt()
            break
        case 'Quit':
            process.exitCode = 0;
            break
    }
}

const rangePrompt = async () => {
    const answers = await inquirer.prompt({
        name: 'range_prompt',
        type: 'list',
        message: 'Which pokemon would you like to select from?\n',
        choices: [
            'All current pokemon.',
            'Original 151 pokemon.',
            'Quit',
        ]
    })

    let fetchedPokemon

    switch (answers.range_prompt) {

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

const searchMethodPrompt = async () => {
    const answers = await inquirer.prompt({
        name: 'search_method_prompt',
        type: 'list',
        message: 'How would you like to search?\n',
        choices: [
            'Pokemon ID.',
            'Pokemon name.',
            'Quit',
        ]
    })

    switch (answers.search_method_prompt) {
        case 'Pokemon ID.':
            console.log('search by id')
            break
        case 'Pokemon name.':
            console.log('search by name')
            break
        case 'Quit':
            process.exitCode = 0;
            break
    }
}

export { initialPrompt, rangePrompt }

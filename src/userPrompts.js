import inquirer from "inquirer"
import { getPokemonByIdOrName } from "./fetches/getPokemon.js"
import { getRandomPokemon, allCurrentPokemons, originalPokemons } from './fetches/getRandomPokemon.js'
import formatResults from "./utilities/formatResults.js"

let fetchedPokemon

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
            idOrNamePrompt()
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

    switch (answers.range_prompt) {

        case 'All current pokemon.':
            fetchedPokemon = await getRandomPokemon(allCurrentPokemons)
            if (fetchedPokemon) {
                formatResults(fetchedPokemon)
            }
            break
        case 'Original 151 pokemon.':
            fetchedPokemon = await getRandomPokemon(originalPokemons)
            if (fetchedPokemon) {
                formatResults(fetchedPokemon)
            }
            break
        case 'Quit':
            process.exitCode = 0;
            break
    }
}


const idOrNamePrompt = async () => {
    const answers = await inquirer.prompt({
        name: 'id_or_name_prompt',
        type: 'input',
        message: 'Please enter a valid pokemon ID or name: ',
        default() {
            return 41
        },
    })
    
    fetchedPokemon = await getPokemonByIdOrName(answers.id_or_name_prompt)

    if (fetchedPokemon) {
        return formatResults(fetchedPokemon)
    }

    return
}

export { initialPrompt, rangePrompt }

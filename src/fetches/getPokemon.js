import errorMessage from "../utilities/errorMessage.js"

const getPokemonByIdOrName = async (userInput) => {
    if (typeof(userInput) === 'string') {
        userInput = userInput.toLowerCase()
    }

    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    
    if (data.status === 404) {
        errorMessage('Pokemon does not exist - invalid ID or name')
    } else {
        const pokemon = await data.json()
        return pokemon
    }
}

export { getPokemonByIdOrName }

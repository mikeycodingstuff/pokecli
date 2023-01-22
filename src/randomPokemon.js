import randomIntInclusive from "./utilities/randomIntInclusive.js"

const getNumberOfTotalCurrentPokemon = async () => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokedex/1`)
    const pokedexInfo = await data.json()

    return pokedexInfo.pokemon_entries.length
}

const getRandomPokemon = async (pokemonRange) => {
    const id = randomIntInclusive(pokemonRange)
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await data.json()

    return pokemon
}

const originalPokemons = { min: 1, max: 151 }
const allCurrentPokemons = { min: 1, max: await getNumberOfTotalCurrentPokemon() }

export {
    getNumberOfTotalCurrentPokemon,
    getRandomPokemon,
    originalPokemons,
    allCurrentPokemons,
}

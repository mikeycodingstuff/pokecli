import randomIntInclusive from "../randomIntInclusive.js"
import { getPokemonById } from "./getPokemon.js"

const getNumberOfTotalCurrentPokemon = async () => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokedex/1`)
    const pokedexInfo = await data.json()

    return pokedexInfo.pokemon_entries.length
}

const getRandomPokemon = async (pokemonRange) => {
    const id = randomIntInclusive(pokemonRange)
    return getPokemonById(id)
}

const originalPokemons = { min: 1, max: 151 }
const allCurrentPokemons = { min: 1, max: await getNumberOfTotalCurrentPokemon() }

export {
    getNumberOfTotalCurrentPokemon,
    getRandomPokemon,
    originalPokemons,
    allCurrentPokemons,
}

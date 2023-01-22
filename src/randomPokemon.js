import randomIntInclusive from "./utilities/randomIntInclusive.js"

const originalPokemons = { min: 1, max: 151 }

const getRandomPokemon = async () => {
    const id = randomIntInclusive(originalPokemons)
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await data.json()

    return pokemon
}

export default getRandomPokemon

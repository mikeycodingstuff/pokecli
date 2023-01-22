const getPokemonById = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await data.json()

    return pokemon
}

export { getPokemonById }

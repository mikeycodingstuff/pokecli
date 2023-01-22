const getPokemonById = async (id) => {

    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (data.status === 404) {
        console.log('Pokemon does not exist - invalid ID')
    } else {
        const pokemon = await data.json()
        return pokemon
    }
}

export { getPokemonById }

const formatResults = (pokemon) => {
    console.log(`
        Pokemon: ${pokemon.name}
        Id: ${pokemon.id}
        Type(s): ${displayTypes(pokemon.types)}
    `)
}

const displayTypes = (typesArray) => {
    console.log(typesArray)
    return typesArray.map(({type}) => `${type.name.toUpperCase()}`).join(', ')
}

export default formatResults
import chalk from "chalk"

const formatResults = (pokemon) => {
    console.log(`
        ${chalk.bgHex('#7b62ac')('RESULTS:')}

        Pokemon: ${capitalise(pokemon.name)}
        Id: ${pokemon.id}
        Type(s): ${displayTypes(pokemon.types)}
    `)
}

const displayTypes = (typesArray) => {
    return typesArray.map(({type}) => `${type.name.toUpperCase()}`).join(', ')
}

const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default formatResults

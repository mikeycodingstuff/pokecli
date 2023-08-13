import chalk from 'chalk'
import sleep from './utilities/sleep.js'

const mainColor = '#7b62ac'

const welcome = async () => {
    console.log(`

        ${chalk.bgHex(mainColor)('POKEMON CLI')}
        by ${chalk.hex(mainColor)('Mikey')}

        A command line tool that shows pokemon info by consuming the pokemon API (found at https://pokeapi.co/)

    `)

    await sleep()
}

export default welcome

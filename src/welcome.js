import chalk from 'chalk'
import sleep from './utilities/sleep.js'

const mainColor = '#7b62ac'

const welcome = async () => {
    console.log(`
        ${chalk.bgHex(mainColor)('POKEMON API CLI')}
        by ${chalk.hex(mainColor)('Mikey')}

        An app for finding pokemon via the command line.
    `)

    await sleep(2000)
}

export default welcome

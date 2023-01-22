#!usr/bin/env node

import welcome from './src/welcome.js'
import { initialPrompt } from './src/userPrompts.js'

await welcome()
await initialPrompt()

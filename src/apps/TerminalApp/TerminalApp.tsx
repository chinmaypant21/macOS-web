// @ts-ignore
import Terminal from 'react-console-emulator'
import { commands } from '@utils/data/terminal/commands'

import style from './terminal.module.css'

const headerMessage = `Last login: Mon May 10 11:47:21 on ttys000
Type "help" to get a list of available commands.
`

const TerminalApp = () => {
    return (
        <div onFocus={(e) =>{e.stopPropagation()}} class={style['terminal-container']}>
        <Terminal
            commands={commands}
            welcomeMessage={headerMessage}
            promptLabel={'chinz@macbook-pro:~$'}
            />
        </div>
    )
}

export default TerminalApp
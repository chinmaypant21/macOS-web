// @ts-ignore
import Terminal from 'react-console-emulator'

import style from './terminal.module.css'

const commands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args : any) => args.join(' ')
    }
}

const TerminalApp = () => {
    return (
        <div class={style['terminal-container']}>
        <Terminal
            commands={commands}
            welcomeMessage={'Last login: Mon May 10 11:47:21 on ttys000'}
            promptLabel={'chinz@macbook-pro:~$'}
            />
        </div>
    )
}

export default TerminalApp
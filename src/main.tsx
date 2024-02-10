import { render } from 'preact'

import { App } from './app.tsx'

import '@assets/styles/index.css'
import '@assets/styles/fonts.css'

render(<App />, document.getElementById('app')!)

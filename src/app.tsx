import Menubar from '@layout/Menubar/Menubar'
import Screen from '@layout/Screen/Screen'
import Dock from '@layout/Dock/Dock'

import '@styles/app.css'

export function App() {

  return (
    <main id='desktop-container'>
      <Menubar />
      <Screen />
      <Dock />
    </main>
  )
}

import { activeWindows, presentFocusedWindow } from '@layout/Screen/Screen'

import style from './Dock.module.css'
import { Fragment } from 'preact/jsx-runtime'
import DockApp from './components/DockApp'

const Dock = () => {

  return (
    <section id={style['dock-body']}>
      <div class={style['dock-container']}>
      {
        activeWindows.value.map((window) => (
          <Fragment key={window.index}>
            <DockApp window={window} />
          </Fragment>
        ))
      }
      </div>
    </section>
  )
}

export default Dock
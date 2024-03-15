import { Fragment } from 'preact/jsx-runtime'
import { computed } from '@preact/signals'

import { activeWindows, createProcess, presentFocusedWindow } from '@layout/Screen/Screen'
import DockApp from './components/DockApp'

import style from './Dock.module.css'

/*
Dock has 2 types of App:
Opened App
Unopened Pinned App

Opened Apps can be or can not be pinned
*/

const pinnedDockApps: AppBaseConfig[] = [
  {
    id: 'a1',
    title: 'ExApp1',
    isMinimized: false,
    dimensions: {
      width: 800,
      height: 600,
      minWidth: 200,
      minHeight: 300
    },
  },
  {
    id: 'a2',
    title: 'ExApp2',
    isMinimized: false,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
]

const dockApps = computed<Array<AppBaseConfig | AppWindowConfig>>(() => {
  var appList: any = [];
  var activeWindowList: any = structuredClone(activeWindows.value)

  pinnedDockApps.map((pinnedApp) => {
    const notAdded = activeWindowList.every((activeApp: any, index: any) => {
      if (pinnedApp.id === activeApp.id) {
        appList.push(activeApp)
        activeWindowList.splice(index, 1)
        return false;
      }

      else return true;
    })

    if (notAdded) {
      appList.push(pinnedApp)
    }
  })

  appList = [...appList, ...activeWindowList]
  return appList;
})


const Dock = () => {

  return (
    <section id={style['dock-body']}>
      <div class={style['dock-container']}>
        {
          dockApps.value.map((window) => (
            <Fragment key={window.id}>
              <DockApp window={window} />
            </Fragment>
          ))
        }
      </div>
    </section>
  )
}

export default Dock
import { Fragment } from 'preact/jsx-runtime'
import { computed } from '@preact/signals'

import { activeWindows, fullScreenWindows } from '@layout/Screen/Screen'
import DockApp from './components/DockApp'

//Data
import { appConfigStore } from '@store/appConfigStore'

//Style
import style from './Dock.module.css'

/*
Dock has 2 types of App:
Opened App
Unopened Pinned App

Opened Apps can be or can not be pinned
*/

const pinnedDockApps: any = [
// const pinnedDockApps: AppBaseConfig[] = [
  [
  appConfigStore.finder,
  appConfigStore.settings,
  ],
  [
  appConfigStore.terminal,
  appConfigStore.calculator,
  appConfigStore.safari,
  ],
  [
  appConfigStore.photos,
  appConfigStore['visual-studio-code'],
  appConfigStore.spotify,
  appConfigStore['google-maps-app'],
  appConfigStore['okso-draw-app'],
  appConfigStore.whatsapp,
  ]
]

const dockApps = computed<Array<AppWindowConfig[]>>(() => {
  var mainList : any[] = [];
  var activeWindowList: any = structuredClone(activeWindows.value)
  
  pinnedDockApps.map((appSection: AppBaseConfig[]) => {
    var appList: any = [];
    appSection.map((pinnedApp: AppBaseConfig) => {
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
    mainList.push(appList)
  }
  )

  if (activeWindowList.length){
    mainList.push(activeWindowList)
  }
  return mainList;
})


const Dock = () => {

  // {fullScreenWindows.value.length && <>}
  return (
    <section
      onContextMenu={(e) => {e.preventDefault()}}
      id={style['dock-body']} 
      class={`
        ${(fullScreenWindows.value.length) ? style['dock-fs-hidden'] : ''}
      `}
    >
      <div
        class={style['dock-container']}
      >
        {
          dockApps.value.map((appSection, count) => {
            return (
              <div class={style['dock-item-section']}>
                {
                  appSection.map((window) => (
                    <Fragment key={window.id}>
                      <DockApp window={window} />
                    </Fragment>
                  ))
                }

                {(count !== (dockApps.value.length -1)) && (
                  <div class={style['section-divider']}>
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Dock
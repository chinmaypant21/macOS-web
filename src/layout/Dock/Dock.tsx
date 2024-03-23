import { Fragment } from 'preact/jsx-runtime'
import { useState } from 'preact/hooks'
import { computed } from '@preact/signals'
import { FC } from 'preact/compat'

import { activeWindows, fullScreenWindows } from '@layout/Screen/Screen'
import DropMenu from '@components/ContextMenu/DropMenu'
import { closeAllWindow } from '@utils/app_methods/app_window_handler'
import DockApp from './components/DockApp'

//Data
import { appConfigStore } from '@store/appConfigStore'

//Style
import style from './Dock.module.css'


const pinnedDockApps: Array<AppBaseConfig[]> = [
  [
    appConfigStore.finder,
    appConfigStore.settings,
    appConfigStore.safari,
  ],
  [
    appConfigStore.terminal,
    appConfigStore['visual-studio-code'],
  ],
  [
    appConfigStore.photos,
    appConfigStore.spotify,
    appConfigStore['google-maps-app'],
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

const AppContextMenu: FC<{ handleCloseMenu?: () => void, isOpen: boolean }> = ({ handleCloseMenu, isOpen }) => {
  function handleClick(e: any) {
    e.stopPropagation()
  }

  if (isOpen) return (
    <div class={style['dock-menu-wrapper']}>
      <div
        onClick={handleClick}
        class={style['dock-context-menu-container']}
      >
        <DropMenu
          listData={[{
            groupKey: 'g1',
            items: [
              { text: 'Turn Hiding On' },
              { text: 'Turn Magnification On', disabled: true },
              { text: 'Close All Windows', onclick: closeAllWindow },
            ]},
            {
              groupKey: 'g2',
              items: [
                { text: 'Dock Preferences...', disabled: true },
              ]
            }
          ]}
          // handleClose={handleCloseMenu}
        />
      </div>
    </div>
  )

  else return null;
}


const Dock = () => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

  function handleContextMenu(e: any) {
    e.preventDefault();
    setShowContextMenu(true);
  }

  // {fullScreenWindows.value.length && <>}
  return (
    <section
      tabIndex={0}
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={() => setShowContextMenu(false)}
      onBlur={() => setShowContextMenu(false)}
      id={style['dock-body']} 
      class={`
        ${(fullScreenWindows.value.length) ? style['dock-fs-hidden'] : ''}
      `}
    >
      <div
        class={style['dock-container']}
      >
        <AppContextMenu isOpen={showContextMenu} />
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
import { Fragment } from 'preact/jsx-runtime'
import { computed } from '@preact/signals'

import { activeWindows } from '@layout/Screen/Screen'
import DockApp from './components/DockApp'

//Style
import style from './Dock.module.css'

//Icon
import FinderIcon from '@assets/images/app/finder.svg'
import SettingsIcon from '@assets/images/app/settings.svg'
import SafariIcon from '@assets/images/app/safari.png'
import CodeIcon from '@assets/images/app/vscode.png'
import CalculatorIcon from '@assets/images/app/calculator.svg'
import PhotosIcon from '@assets/images/app/photos.svg'
import SpotifyIcon from '@assets/images/app/spotify.png'
import WhatsappIcon from '@assets/images/app/whatsapp.png'

/*
Dock has 2 types of App:
Opened App
Unopened Pinned App

Opened Apps can be or can not be pinned
*/

const pinnedDockApps: AppBaseConfig[] = [
  {
    id: '1',
    title: 'Finder',
    isMinimized: false,
    icon: FinderIcon,
    dimensions: {
      width: 800,
      height: 600,
      minWidth: 200,
      minHeight: 300
    },
  },
  {
    id: '2',
    title: 'Settings',
    isMinimized: false,
    icon: SettingsIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '3',
    title: 'Safari',
    isMinimized: false,
    icon: SafariIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '4',
    title: 'VS Code',
    isMinimized: false,
    icon: CodeIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '5',
    title: 'Calculator',
    isMinimized: false,
    icon: CalculatorIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '6',
    title: 'Photos',
    isMinimized: false,
    icon: PhotosIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '7',
    title: 'Spotify',
    isMinimized: false,
    icon: SpotifyIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    id: '8',
    title: 'WhatsApp',
    isMinimized: false,
    icon: WhatsappIcon,
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
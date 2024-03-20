import { Fragment } from 'preact/jsx-runtime'
import { computed } from '@preact/signals'

import { activeWindows, fullScreenWindows } from '@layout/Screen/Screen'
import DockApp from './components/DockApp'

//Style
import style from './Dock.module.css'

//Icon
import FinderIcon from '@assets/images/app/finder.svg'
import SettingsIcon from '@assets/images/app/settings.svg'
import TerminalIcon from '@assets/images/app/terminal.png'
import SafariIcon from '@assets/images/app/safari.png'
import CodeIcon from '@assets/images/app/vscode.png'
import MapsIcon from '@assets/images/app/maps.png'
import CalculatorIcon from '@assets/images/app/calculator.svg'
import PhotosIcon from '@assets/images/app/photos.svg'
import SpotifyIcon from '@assets/images/app/spotify.svg'
import DrawIcon from '@assets/images/app/draw.png'
import WhatsappIcon from '@assets/images/app/whatsapp.png'

/*
Dock has 2 types of App:
Opened App
Unopened Pinned App

Opened Apps can be or can not be pinned
*/

const pinnedDockApps: AppBaseConfig[] = [
  {
    id: 'finder',
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
    id: 'settings',
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
    id: 'terminal-app',
    title: 'Terminal',
    isMinimized: false,
    icon: TerminalIcon,
    dimensions: {
      width: 650,
      height: 400,
      minWidth: 100,
      minHeight: 100
    }
  },
  {
    id: 'safari-browser',
    title: 'Safari',
    isMinimized: false,
    icon: SafariIcon,
    dimensions: {
      width: 1000,
      height: 600,
      minWidth: 50,
      minHeight: 50
    },
  },
  {
    id: 'visual-studio-code',
    title: 'VS Code',
    isMinimized: false,
    icon: CodeIcon,
    dimensions: {
      width: 800,
      height: 500,
      minWidth: 300,
      minHeight: 200
    }
  },
  {
    id: 'calculator',
    title: 'Calculator',
    isMinimized: false,
    icon: CalculatorIcon,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 200,
      minHeight: 200
    }
  },
  {
    id: 'google-maps-app',
    title: 'Maps',
    isMinimized: false,
    icon: MapsIcon,
    dimensions: {
      width: 800,
      height: 600,
      minWidth: 300,
      minHeight: 300
    }
  },
  {
    id: 'photos',
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
    id: 'spotify-app',
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
    id: 'okso-draw-app',
    title: 'Okso',
    isMinimized: false,
    icon: DrawIcon,
    dimensions: {
      width: 800,
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

  // {fullScreenWindows.value.length && <>}
  return (
    <section 
      id={style['dock-body']} 
      class={`
        ${(fullScreenWindows.value.length) ? style['dock-fs-hidden'] : ''}
      `}
    >
      <div
        class={style['dock-container']}
      >
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
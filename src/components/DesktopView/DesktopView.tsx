import { useState } from 'preact/hooks'
import { FC } from 'preact/compat'

// Data
import { appConfigStore } from 'src/store/appConfigStore'

import { createProcess } from 'src/layout/Screen/Screen'
import { focusWindow, newWindow } from '@utils/app_methods/app_window_handler'
import DropMenu from '../ContextMenu/DropMenu'

// Style
import style from './DesktopView.module.css'

const desktopAppList = [
    appConfigStore['okso-draw-app'],
    appConfigStore['calculator'],
    appConfigStore['visual-studio-code'],
]

const MenuWrapper : FC<any> = ({handleCloseMenu, handlerProp, isOpen}) => {
    if (isOpen) return (
        <div class={style.contextMenu}>
            <DropMenu listData={[
                {
                    groupKey: 'g1',
                    items: [
                        { text: 'Open', onclick: () => newWindow(handlerProp) },
                        { text: 'Open With', nestedMenu: [], disabled: true},
                    ]
                },
                {
                    groupKey: 'g2',
                    items: [
                        { text: 'Move to Trash' },
                    ]
                },
                {
                    groupKey: 'g3',
                    items: [
                        { text: 'Get Info', disabled: true},
                        { text: 'Make Alias', onclick: () => console.log('s')},
                        { text: 'Share', onclick: () => console.log('s')},
                    ]
                },
                {
                    groupKey: 'g4',
                    items: [
                        { text: 'Copy', onclick: () => console.log('s')},
                    ]
                },
            ]} />
        </div>
    )

    else return null;
}

const AppTile: FC<{app: AppBaseConfig}> = ({app}) => {
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

    function handleAppOpen() {
        const pid = createProcess(app);
        focusWindow(pid);
    }

    function handleContextMenu(e: any) {
        e.preventDefault()
        e.stopPropagation()
        setShowContextMenu(true)
    }

        return (
            <div
                tabIndex={0}
                class={style.app}
                onKeyPress={(e) => (e.key === 'Enter') && handleAppOpen()}
                onDblClick={handleAppOpen}
                onClick={() => setShowContextMenu(false)}
                onBlur={() => setShowContextMenu(false)}
                onContextMenu={(e) => handleContextMenu(e)}
            >
                <MenuWrapper handlerProp={app} isOpen={showContextMenu} />

                <img class={style.icon} src={app.icon}/>
                <span class={style.appTitle}>{app.title}</span>
            </div>
        )
}

const DesktopView = () => {
    return (
        <div class={style.desktop}>
            {
                desktopAppList.map(app => 
                    <AppTile app={app} />
                )
            }
        </div>
    )
}

export default DesktopView
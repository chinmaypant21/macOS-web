import { appConfigStore } from 'src/store/appConfigStore'

import style from './DesktopView.module.css'
import { createProcess } from 'src/layout/Screen/Screen'
import { focusWindow } from 'src/utils/app_methods/app_window_handler'

const desktopAppList = [
    appConfigStore['okso-draw-app'],
    appConfigStore['calculator']
]

const DesktopView = () => {
    function handleAppOpen(app: any) {
        const pid = createProcess(app);
        focusWindow(pid);
    }

    return (
        <div class={style.desktop}>
            {
                desktopAppList.map(app => {
                    return (
                        <div
                            tabIndex={0}
                            class={style.app}
                            onKeyPress={(e) => (e.key === 'Enter') && handleAppOpen(app) }
                            onDblClick={() => handleAppOpen(app)}
                        >
                            <img src={app.icon} height={50} width={50} />
                            <span>{app.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DesktopView
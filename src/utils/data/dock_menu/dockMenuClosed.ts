import { optionsMenu } from "./common"

import { focusWindow } from "@utils/app_methods/app_window_handler"
import { createProcess } from "@layout/Screen/Screen"

function openWindow(window: AppBaseConfig){
    const pid = createProcess(window)
    focusWindow(pid)
}

export const dockMenuClosed : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Options', onclick: () => console.log('s'), nestedMenu: optionsMenu},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Open', onclick: openWindow},
        ]
    },
]
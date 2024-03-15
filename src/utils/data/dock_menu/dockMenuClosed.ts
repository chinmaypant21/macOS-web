import { optionsMenu } from "./common"

import { createProcess } from "@layout/Screen/Screen"

function openWindow(window: AppBaseConfig){
    createProcess(window)
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
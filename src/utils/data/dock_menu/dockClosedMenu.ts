import { activeWindows, presentFocusedWindow } from "src/layout/Screen/Screen"
import { optionsMenu } from "./common"

function openWindow(window: AppWindowConfig){
}

export const dockMenuMinData : ContextMenu = [
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
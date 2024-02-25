import { closeWindow, minimizeWindow } from "src/utils/app_methods/app_window_handler"
import { optionsMenu } from "./common"

export const dockMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Options', onclick: () => console.log('s'), nestedMenu: optionsMenu},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Hide', onclick: minimizeWindow},
            { text: 'Show All Windows', onclick: () => console.log('s'), disabled: true},
            { text: 'Quit', onclick: closeWindow},
        ]
    },
]
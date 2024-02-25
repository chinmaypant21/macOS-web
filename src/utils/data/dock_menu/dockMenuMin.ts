import { closeWindow, showWindow } from "@utils/app_methods/app_window_handler"
import { optionsMenu } from "./common"

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
            { text: 'Show', onclick: showWindow},
            { text: 'Show All Windows', onclick: () => console.log('s'), disabled: true},
            { text: 'Quit', onclick: closeWindow},
        ]
    },
]
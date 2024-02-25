import { activeWindows, presentFocusedWindow } from "src/layout/Screen/Screen"
import { optionsMenu } from "./common"

function showWindow(window: AppWindowConfig){
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.index !== window.index) {
            return window_temp
        }
        else {
            return {
                ...window_temp,
                isMinimized: false
            }
        }
    })

    presentFocusedWindow.value = {
        isActive: true,
        windowId: window.index
    }
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
            { text: 'Show', onclick: showWindow},
            { text: 'Show All Windows', onclick: () => console.log('s'), disabled: true},
            { text: 'Quit', onclick: () => console.log('s')},
        ]
    },
]
import { activeWindows, presentFocusedWindow } from "@layout/Screen/Screen"
import { optionsMenu } from "./common"

function minimizeWindow(window: AppWindowConfig) {
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.index !== window.index) {
            return window_temp
        }
        else {
            return {
                ...window_temp,
                isMinimized: true
            }
        }
    })

    presentFocusedWindow.value = {
        windowId: 0,
        isActive: false
    }
}

function closeWindow(window: AppWindowConfig){
    if(presentFocusedWindow.value.windowId === window.index){
        presentFocusedWindow.value = {
            windowId: 0,
            isActive: false
        }
    }
    
    activeWindows.value = activeWindows.value.filter((window_temp) => (
      window_temp.index !== window.index
    ))
}

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
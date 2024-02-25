import { activeWindows, presentFocusedWindow } from "src/layout/Screen/Screen"

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

export {closeWindow, showWindow, minimizeWindow}
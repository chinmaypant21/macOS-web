import { activeWindows, presentFocusedWindow } from "src/layout/Screen/Screen"

function minimizeWindow(window: AppWindowConfig) {
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.pid !== window.pid) {
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
        if (window_temp.pid !== window.pid) {
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
        windowId: window.pid
    }
}

function closeWindow(window: AppWindowConfig){
    if(presentFocusedWindow.value.windowId === window.pid){
        presentFocusedWindow.value = {
            windowId: 0,
            isActive: false
        }
    }
    
    activeWindows.value = activeWindows.value.filter((window_temp) => (
      window_temp.pid !== window.pid
    ))
}

function focusWindow(window: AppWindowConfig){
    presentFocusedWindow.value = {
        isActive: true,
        windowId: window.pid
    }
}

export {closeWindow, showWindow, minimizeWindow, focusWindow}
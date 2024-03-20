import { activeWindows, presentFocusedWindow } from "src/layout/Screen/Screen"

function minimizeWindow(window_pid: number) {
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.pid !== window_pid) {
            return window_temp
        }
        else {
            return {
                ...window_temp,
                isMaximized: false,
                isMinimized: true
            }
        }
    })

    presentFocusedWindow.value = {
        windowId: 0,
        isActive: false
    }
}

function showNormalWindow(window_pid: number){
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.pid !== window_pid) {
            return window_temp
        }
        else {
            return {
                ...window_temp,
                isMaximized: false,
                isMinimized: false
            }
        }
    })

    presentFocusedWindow.value = {
        isActive: true,
        windowId: window_pid
    }
}

function closeWindow(window_pid: number){
    if(presentFocusedWindow.value.windowId === window_pid){
        presentFocusedWindow.value = {
            windowId: 0,
            isActive: false
        }
    }
    
    activeWindows.value = activeWindows.value.filter((window_temp) => (
      window_temp.pid !== window_pid
    ))
}

function focusWindow(window_pid: number){
    presentFocusedWindow.value = {
        isActive: true,
        windowId: window_pid
    }
}


function maximizeWindow(window_pid: number){
    activeWindows.value = activeWindows.value.map((window_temp) => {
        if (window_temp.pid !== window_pid) {
            return window_temp
        }
        else {
            return {
                ...window_temp,
                isMaximized: true
            }
        }
    })

    // Is this redundant
    presentFocusedWindow.value = {
        windowId: window_pid,
        isActive: true
    }
}

export {closeWindow, showNormalWindow, minimizeWindow, maximizeWindow, focusWindow}
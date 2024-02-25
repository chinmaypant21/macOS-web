import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { FC } from 'preact/compat'

import { dockMenuData } from '@utils/data/dock_menu/dockMenu'
import DropMenu from '@components/ContextMenu/DropMenu'
import { activeWindows, presentFocusedWindow } from '@layout/Screen/Screen'

import style from '../Dock.module.css'

const DockContextMenu = () => {
    function handleClick(e: JSX.TargetedMouseEvent<HTMLDivElement>){
        e.stopPropagation()
    }
    return (
        <div class={style['menu-wrapper']}>
        <div
            onClick={handleClick}
            class={style['context-menu-container']}
            >
            <DropMenu listData={dockMenuData} />
        </div>
        </div>
    )
}

function updateWindowStatus(window: AppWindowConfig) {
    let action;

    if (window.isMinimized) {
        action = 'ShowWindow' // UnMinimize the window and focus
    }
    else if (window.index === presentFocusedWindow.value.windowId) {
        action = 'MinimizeWindow' //Minimize the current focsed window
    }
    else {
        action = 'FocusWindow' // Focus the window
    }

    //If app is minimized
    switch (action) {

        case 'ShowWindow':
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
            break

        case 'MinimizeWindow':
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
            break

        case 'FocusWindow':
            presentFocusedWindow.value = {
                isActive: true,
                windowId: window.index
            }
            break

    }
}


const DockApp: FC<{ window: AppWindowConfig }> = ({ window }) => {
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

    function showContextMenu(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
        e.preventDefault()
        setIsRightClicked(true);
    }

    function handleClick(){
        setIsRightClicked(false)
        updateWindowStatus(window)
    }

    function handleBlur() {
        setIsRightClicked(false)
    }

    function toggleAnimation(event: any) {
        const target = event.currentTarget;
        target.classList.add(style['clicked']);

        setTimeout(() => {
            target.classList.remove(style['clicked']);
        }, 1000);
    }

    return (
        <div
            class={style['dock-item']}
            tabIndex={0}
            onContextMenu={showContextMenu}
            onBlur={handleBlur}
            onClick={(e) => {
                toggleAnimation(e)
                handleClick()
            }}
        >
            <span class={style['app-icon']}>{window.title}</span>
            {isRightClicked && <DockContextMenu />}
            <div
                style={!window.isMinimized ? { backgroundColor: 'var(--color-green)' } : {}}
                class={style['active-indicator']}
            >
            </div>
        </div>
    )
}

export default DockApp
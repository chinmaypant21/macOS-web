import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { FC } from 'preact/compat'


import { focusWindow, minimizeWindow, showWindow } from '@utils/app_methods/app_window_handler'
import DropMenu from '@components/ContextMenu/DropMenu'
import { createProcess, presentFocusedWindow } from '@layout/Screen/Screen'

//Data
import { dockMenuData } from '@utils/data/dock_menu/dockMenu'
import { dockMenuMinData } from '@utils/data/dock_menu/dockMenuMin'
import { dockMenuClosed } from '@utils/data/dock_menu/dockMenuClosed'

//Style
import style from '../Dock.module.css'

const AppContextMenu = ({window, handleCloseMenu, isOpen}: any) => {
    function handleClick(e: JSX.TargetedMouseEvent<HTMLDivElement>){
        e.stopPropagation()
    }

    return (
        <div class={style['menu-wrapper']}>
            <div
                onClick={handleClick}
                class={style['context-menu-container']}
                >
                    {
                        isOpen
                        ? <DropMenu 
                            listData={window.isMinimized ? dockMenuMinData : dockMenuData}
                            handlerProp={window} 
                            handleClose={handleCloseMenu} 
                        />
                        : <DropMenu 
                            listData={dockMenuClosed}
                            handlerProp={window} 
                            handleClose={handleCloseMenu} 
                        />
                    }
            </div>
        </div>
    )
}

function updateWindowStatus(window: AppWindowConfig) {
    let action;

    if (window.isMinimized) {
        action = 'ShowWindow' // UnMinimize the window and focus
    }
    else if (window.pid === presentFocusedWindow.value.windowId) {
        action = 'MinimizeWindow' //Minimize the current focsed window
    }
    else {
        action = 'FocusWindow' // Focus the window
    }

    //If app is minimized
    switch (action) {

        case 'ShowWindow':
            showWindow(window)
            break

        case 'MinimizeWindow':
            minimizeWindow(window)
            break

        case 'FocusWindow':
            focusWindow(window)
    }
}


const DockApp: FC<{ window: AppWindowConfig | AppBaseConfig }> = ({ window }) => {
    //Having a pid indicates that the App is open
    const isOpen = ('pid' in window);
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

    function showContextMenu(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
        e.preventDefault()
        setIsRightClicked(true);
    }

    function handleClick(){
        setIsRightClicked(false)
        if(isOpen){
            updateWindowStatus(window)
        } else {
            createProcess(window)
        }
    }

    function handleBlur(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsRightClicked(false)
          }
    }

    function toggleAnimation(event: any) {
        const target = event.currentTarget;
        target.classList.add(style['clicked']);

        setTimeout(() => {
            target.classList.remove(style['clicked']);
        }, 1000);
    }

    function handleCloseMenu(){
        setIsRightClicked(false);
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
            <div class={style['app-icon']}>
                <img src={window.icon} />
            </div>
            {/* <span class={style['app-icon']}>{window.title}</span> */}
            {isRightClicked && <AppContextMenu window={window} handleCloseMenu={handleCloseMenu} isOpen={isOpen} />}
            {
                isOpen &&
                <div
                style={!window.isMinimized ? { backgroundColor: 'var(--color-green)' } : {}}
                class={style['active-indicator']}
                >
                    {/* hhhh */}
                </div>
            }
        </div>
    )
}

export default DockApp
import { FC } from "preact/compat";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useComputed, useSignalEffect } from "@preact/signals";
import { Fragment } from "preact/jsx-runtime";

import { useDrag } from "src/hooks/useDrag";
import { screenStartingCoordinates, presentFocusedWindow } from "@layout/Screen/Screen";

import style from './AppWindow.module.css'

type AppWindowProps = {
    data: {
        index: number,
        title: string,
        isMinimized: boolean
        dimensions: {
            width:number,
            height:number,
            minWidth: number,
            minHeight:number,
        }
    }
    handleMinimize: any,
    handleClose: any,
}

const AppWindow : FC<AppWindowProps> = ({data, handleMinimize, handleClose}) => {
    const appWindowRef          = useRef<HTMLDivElement>(null);
    const [ offset, setOffset ] = useState<ScreenCoordinates>();
    const [ isFullScreen, setIsFullScreen] = useState<boolean>(false);

    // Wherever defining computed or signal inside a component, always use hooks otherwise there are going to be lots of re-renders.
    const windowIndex = useComputed(()=>{
        return (presentFocusedWindow.value.windowId === data.index) ? 2 : 1 
    })

    const { position, handleMouseDown: onMouseDown } = useDrag({
        ref: appWindowRef,
        offset
    });

    const toolbarBtnMap = useMemo(() => ([
        {
            id: 'btn-close',
            onclick: handleWindowClose
        },
        {
            id: 'btn-min',
            onclick: handleWindowMinimize
        },
        {
            id: 'btn-expand',
            onclick: handleWindowExpand
        }
    ]),[handleWindowExpand, handleWindowClose, handleWindowMinimize])

    useSignalEffect(() => {
        setOffset(screenStartingCoordinates.value)
    })

    useSignalEffect(() => {
        if((data.index === presentFocusedWindow.value.windowId) && presentFocusedWindow.value.isActive){
            appWindowRef.current?.focus();
        }
    })
    
    useEffect(() => {
        if(!appWindowRef.current) return;

        if(!data.isMinimized){
            appWindowRef.current?.classList.remove(style['minimized']);

            if(data.index === presentFocusedWindow.value.windowId && presentFocusedWindow.value.isActive){
                appWindowRef.current?.focus();
            }
        }
        else{
            appWindowRef.current?.classList.add(style['minimized'])
        }
    },[data.isMinimized, appWindowRef])

    useEffect(() => {
    // Passed dimentions are for initial rendering only
        if(appWindowRef.current){
            appWindowRef.current.style.width     = `${Math.min(data.dimensions.width, window.innerWidth)}px`
            appWindowRef.current.style.height    = `${Math.min(data.dimensions.height, window.innerHeight)}px`
            appWindowRef.current.style.minWidth  = `${Math.max(data.dimensions.minWidth, 100)}px`
            appWindowRef.current.style.minHeight = `${Math.max(data.dimensions.minHeight, 100)}px`
        }
    },[appWindowRef])

    function handleMouseEnter() {
        if (appWindowRef.current && !isFullScreen){
            appWindowRef.current.style.willChange = 'top, left, z-index'
        }
    }
    
    function handleMouseLeave() {
        if(appWindowRef.current && !isFullScreen) {
            appWindowRef.current.style.willChange = 'z-index, width, height'
        } 
    }

    function handleDrag(e: any){
        if(!isFullScreen){
            onMouseDown(e);
        }
    }

    function handleTransitionEnd(){
        if(appWindowRef.current) {
            appWindowRef.current.style.transition = '';
            appWindowRef.current.style.transform = '';
        }
    }

    function handleWindowExpand(){
        if(appWindowRef.current){
            appWindowRef.current.style.transition = 'top 0.4s ease-out, left 0.4s ease-out, width 0.4s ease-in-out, height 0.4s ease-in-out';
            
            if (isFullScreen){
                setIsFullScreen(false);
                appWindowRef.current.classList.remove(style['window-fullscreen'])
            }
            else{
                setIsFullScreen(true);
                appWindowRef.current.style.setProperty('--offset-top',`${offset!.y ?? 0}px`);
                appWindowRef.current.style.setProperty('--offset-left',`${offset!.x ?? 0}px`);

                appWindowRef.current.classList.add(style['window-fullscreen'])
            }
        }
    }

    function handleWindowMinimize(){
        handleMinimize()
    }

    function handleWindowClose(){
        appWindowRef.current?.remove()
        handleClose();
    }

    return (
        <div
            onTransitionEnd={handleTransitionEnd}
            className={style['app-window']}
            ref={appWindowRef}
            style={{
                top: position.y,
                left: position.x,
                zIndex: windowIndex.value,
            }}
            tabIndex={0}
            onContextMenu={(e)=>{e.stopPropagation(); e.preventDefault();}}
            onBlur={()=>{
                presentFocusedWindow.value = {
                    ...presentFocusedWindow.value,
                    isActive: false
                }
            }}
            onFocus={()=>{
                presentFocusedWindow.value = {
                    windowId: data.index,
                    isActive: true
                }
            }}
        >
        {
            !data.isMinimized && (
            <Fragment>
                <div class={style['titlebar-container']}>
                    <div
                        onTransitionEnd={(e)=>{e.stopPropagation();}}
                        class={style['toolbar-section']}
                    >
                    {
                        toolbarBtnMap.map((button) => (
                            <div 
                                class={style['toolbar-btn-container']}
                                key={button.id}
                                onClick={button.onclick}
                            >
                                <div
                                    id={style[button.id]}
                                    class={style['toolbar-btn']}
                                >
                                </div>
                            </div>

                        ))
                    }
                    </div>

                    <div 
                        class={style['draggable-container']}
                        style={{flex: 1}}
                        onDblClick={handleWindowExpand}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleDrag}
                    >
                        {data.title ?? 'Unknown Application'}
                    </div>
                </div>

                <div 
                    style={{display:'flex', userSelect: 'text'}}
                >
                    <div id={style['window-sidebar']}>
                        side
                    </div>

                    <div id={style['app-container']}>
                        app
                    </div>
                </div>
            </Fragment>
            )
        }
        </div>
    );
}

export default AppWindow;
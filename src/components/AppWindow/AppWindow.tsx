import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useComputed, useSignalEffect } from "@preact/signals";

import { useDrag } from "src/hooks/useDrag";
import { screenStartingCoordinates, focusedWindow, lastFocusedWindow } from "@layout/Screen/Screen";

import style from './AppWindow.module.css'

type AppWindowProps = {
    idx: number,
    title: string,
    isMinimized: boolean
    handleMinimize: any,
    handleClose: any,
    dimensions: {
        width:number,
        height:number,
        minWidth: number,
        minHeight:number,
    }
}

const AppWindow = ({idx, title, isMinimized, handleMinimize, handleClose, dimensions}: AppWindowProps) => {
    const [isClosed, setIsClosed] = useState<boolean>(false);
    const appWindowRef          = useRef<HTMLDivElement>(null);
    const [ offset, setOffset ] = useState<ScreenCoordinates>();
    const [ isFullScreen, setIsFullScreen] = useState<boolean>(false);

    // if(isMinimized){
    //     return null;
    // }

    if(isClosed){
        return null;
    }

    // Wherever defining computed or signal inside a component, always use hooks otherwise there are going to be lots of re-renders.
    const windowIndex = useComputed(()=>{
        return (lastFocusedWindow.value === idx) ? 2 : 1 
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

    useEffect(() => {
        isClosed && handleClose();
    },[isClosed])

    useEffect(() => {
    // Passed dimentions are for initial rendering only
        if(appWindowRef.current){
            appWindowRef.current.style.width = `${Math.min(dimensions.width, window.innerWidth)}px`
            appWindowRef.current.style.height = `${Math.min(dimensions.height, window.innerHeight)}px`
            appWindowRef.current.style.minWidth = `${Math.max(dimensions.minWidth, 100)}px`
            appWindowRef.current.style.minHeight = `${Math.max(dimensions.minHeight, 100)}px`
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
        setIsClosed(true);
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
            tabIndex={idx}
            onContextMenu={(e)=>{e.stopPropagation(); e.preventDefault();}}
            onBlur={()=>{
                focusedWindow.value=0
            }}
            onFocus={()=>{
                focusedWindow.value=idx
                lastFocusedWindow.value = idx
            }}
        >
            <div class={style['titlebar-container']}>
                <div
                    onTransitionEnd={(e)=>{e.stopPropagation();}}
                    class={style['toolbar-section']}
                >
                {
                    toolbarBtnMap.map((button) => (
                        <div
                            id={style[button.id]}
                            key={button.id}
                            class={style['toolbar-btn']}
                            onClick={button.onclick}
                        >
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
                    {title ?? 'Unknown Application'}
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
        </div>
    );
}

export default AppWindow;
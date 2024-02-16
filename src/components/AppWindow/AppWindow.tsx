import { useMemo, useRef, useState } from "preact/hooks";
import { useComputed, useSignalEffect } from "@preact/signals";

import { useDrag } from "src/hooks/useDrag";
import { screenStartingCoordinates, focusedWindow, lastFocusedWindow } from "@layout/Screen/Screen";

import style from './AppWindow.module.css'

const AppWindow = ({idx}: any) => {
    const appWindowRef          = useRef<HTMLDivElement>(null);
    const [ offset, setOffset ] = useState<ScreenCoordinates>();
    const [ isFullScreen, setIsFullScreen] = useState<boolean>(false);

    // Wherever defining computed or signal inside a component, always use hooks otherwise there are going to be lots of re-renders.
    const windowIndex = useComputed(()=>{
        return (lastFocusedWindow.value === idx) ? 2 : 1 
    })

    const { position, handleMouseDown } = useDrag({
        ref: appWindowRef,
        offset
    });

    const toolbarBtnMap = useMemo(() => ([
        {
            id: 'btn-close',
            onclick: () => {console.log('close')}
        },
        {
            id: 'btn-min',
            onclick: () => {console.log('min')}
        },
        {
            id: 'btn-expand',
            onclick: () => {
                if(appWindowRef.current){
                    appWindowRef.current.style.transition = 'all 0.3s ease';

                    if (isFullScreen){
                        setIsFullScreen(false);
                        appWindowRef.current.style.top = `10%`;
                        appWindowRef.current.style.left = `20%`;
                        appWindowRef.current.style.width = '60%';
                        appWindowRef.current.style.height = '60%';
                    }
                    else{
                        setIsFullScreen(true);
                        appWindowRef.current.style.top = `${offset!.y ?? 0}px`;
                        appWindowRef.current.style.left = `${offset!.x ?? 0}px`;

                        appWindowRef.current.style.width = '100%';
                        appWindowRef.current.style.height = '100%';
                    }
                }

            }
        }
    ]),[offset, isFullScreen])

    useSignalEffect(() => {
        setOffset(screenStartingCoordinates.value)
    })

    function handleMouseEnter() {
        if (appWindowRef.current){
            appWindowRef.current.style.willChange = 'top, left, z-index'
        }
    }
    
    function handleMouseLeave() {
        appWindowRef.current && (appWindowRef.current.style.willChange = 'z-index, width, height')
    }

    function handleTransitionEnd(){
        appWindowRef.current && (
            appWindowRef.current.style.transition = ''
        )
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                >
                    hi
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
import { useEffect, useRef, useState } from "preact/hooks";
import { computed, effect, signal, useComputed, useSignal, useSignalEffect } from "@preact/signals";

import { useDrag } from "src/hooks/useDrag";
import { screenStartingCoordinates, focusedWindow, lastFocusedWindow } from "@layout/Screen/Screen";

import style from './AppWindow.module.css'

const toolbarBtnMap = [
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
        onclick: () => {console.log('expand')}
    }
]

const AppWindow = ({idx}: any) => {
    const draggableRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<ScreenCoordinates>()

    // Wherever defining computed or signal inside a component, always use hooks otherwise there are going to be lots of re-renders.
    const windowIndex = useComputed(()=>{
        return (lastFocusedWindow.value === idx) ? 2 : 1 
    })

    const { position, handleMouseDown } = useDrag({
        ref: draggableRef,
        offset
    });

    useSignalEffect(() => {
        setOffset(screenStartingCoordinates.value)
    })

    function handleMouseEnter() {
        if (draggableRef.current){
            draggableRef.current.style.willChange = 'top, left, z-index';
        }
    }
    
    function handleMouseLeave() {
        if (draggableRef.current){
            draggableRef.current.style.willChange = 'unset';
        }
    }

    return (
        <div
            className={style['app-window']}
            ref={draggableRef}
            style={{
                top: position.y,
                left: position.x,
                zIndex: windowIndex.value
            }}
            tabIndex={1}
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

            <div style={{display:'flex', userSelect: 'text'}}>
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
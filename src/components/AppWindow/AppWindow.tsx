import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useSignalEffect } from "@preact/signals";

import { useDrag } from "src/hooks/useDrag";
import { screenStartingCoordinates } from "@layout/Screen/Screen";

import style from './AppWindow.module.css'

const AppWindow = () => {
    const draggableRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<ScreenCoordinates>()

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
                left: position.x
            }}
        >
            <div className="draggable-panel"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
            >
                Draggable panel
            </div>
            <div className="draggable-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book
            </div>
        </div>
    );
}

export default AppWindow;
// Reference: https://codesandbox.io/p/sandbox/draggable-div-element-react-hook-56xrm

import { Ref, useCallback, useEffect, useState } from "preact/hooks";

type DragHookReturnType = {
    position: ScreenCoordinates,
    handleMouseDown: any
}

type DragHookProps = {
  ref: Ref<HTMLDivElement>,
  offset?: ScreenCoordinates
}

/**
 * Returns a position (including offset) state and a handleMouseDown method.
 * @param ref Reference to the element
 * @param offset Offset (in pixels) from the top and left of screen
 * @see https://codesandbox.io/p/sandbox/draggable-div-element-react-hook-56xrm
 */
export const useDrag = ({ref, offset}: DragHookProps) : DragHookReturnType => {
    const [dragInfo, setDragInfo] = useState<any>();
    const [finalPosition, setFinalPosition] = useState<ScreenCoordinates>({x: 0, y: 0});

    useEffect(() => {
      if(offset) setFinalPosition(offset);
    },[offset])

    const [isDragging, setIsDragging] = useState<boolean>(false);
  
    const updateFinalPosition = (x: number, y: number) => {
        setFinalPosition({
          x: Math.min(Math.max(offset?.x ?? 0, x), window.innerWidth - (window.innerWidth * 0.05)),
          y: Math.min(Math.max(offset?.y ?? 0, y), window.innerHeight - (window.innerHeight * 0.05))
        });
    }
  
    const handleMouseUp = (evt: MouseEvent) => {
      evt.preventDefault();
  
      setIsDragging(false);
    };
  
    const handleMouseDown = (evt: MouseEvent) => {
      evt.preventDefault();
  
      const { clientX, clientY } = evt;
      const { current: draggableElement } = ref;
  
      if (!draggableElement) {
        return;
      }
  
      const { top, left, width, height} = draggableElement.getBoundingClientRect();
  
      setIsDragging(true);
      setDragInfo({
        startX: clientX,
        startY: clientY,
        top,
        left,
        width,
        height
      });
    };
  
    const handleMouseMove = useCallback(
      (evt: MouseEvent) => {
        const { current: draggableElement } = ref;
  
        if (!isDragging || !draggableElement) return;
  
        evt.preventDefault();
  
        const { clientX, clientY } = evt;
  
        const position = {
          x: dragInfo?.startX - clientX,
          y: dragInfo?.startY - clientY
        };
  
        const { top, left } = dragInfo;
        // const { top, left, width, height } = dragInfo;
  
        updateFinalPosition(left - position.x, top - position.y);
      },
      [isDragging, dragInfo, ref, updateFinalPosition]
    );
  
    useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [handleMouseMove]);
  
    return {
      position: finalPosition,
      handleMouseDown,
    };
  };
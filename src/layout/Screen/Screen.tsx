import { JSX, useEffect, useRef, useState } from 'preact/compat';
import { signal } from '@preact/signals';

import ContextMenu from '@components/ContextMenu/ContextMenu';
import AppWindow from '@components/AppWindow/AppWindow';

import style from './Screen.module.css';

export const screenStartingCoordinates = signal<ScreenCoordinates>({x:0,y:0});
export const focusedWindow = signal<number>(0);
export const lastFocusedWindow = signal<number>(0);

const Screen = () => {
  const [ isRightClicked, setIsRightClicked] = useState<boolean>(false);
  const [ contextCoordinates, setContextCoordinates] = useState<ScreenCoordinates>();

  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    screenStartingCoordinates.value = {
      x: screenRef.current?.offsetLeft ?? 0,
      y: screenRef.current?.offsetTop ?? 0
    }
  },[screenRef])

  //remove
  // const [cursorCoord, setCursorCoord] = useState<any>();
  
  // function f(e: any){
  //   setCursorCoord({x: e.pageX, y: e.pageY})
  // }


  function handleRightClick(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsRightClicked(true);
    setContextCoordinates({x: e.pageX, y: e.pageY})
  }

  function handleCloseMenu() {
    setIsRightClicked(false);
  }

  return (
    <div
      ref={screenRef}
      tabIndex={0} //onBlur method requires a tabIndex other than -1
      // onBlur={handleCloseMenu}
      onClick={handleCloseMenu}
      onContextMenu={handleRightClick}
      id={style['screen-container']}
    >
      {/* <span class='text-white'>{JSON.stringify(cursorCoord)}</span> */}
      {isRightClicked && <ContextMenu coordinates={contextCoordinates} />}

    <AppWindow idx={1} />
    <AppWindow idx={2} />
    <AppWindow idx={3} />
    </div>
  )
}

export default Screen
import { JSX, useEffect, useRef, useState } from 'preact/compat';
import { signal } from '@preact/signals';

import ContextMenu from '@components/ContextMenu/ContextMenu';
import AppWindow from '@components/AppWindow/AppWindow';

import style from './Screen.module.css';

export const screenStartingCoordinates = signal<ScreenCoordinates>({x:0,y:0});
export const focusedWindow = signal<number>(0);
export const lastFocusedWindow = signal<number>(0);

export const activeWindows = signal<Array<{index: number, title: string, isMinimized: boolean, dimensions: any}>>([
  {
    index: 1,
    title: 'App1',
    isMinimized: false,
    dimensions: {
      width: 800,
      height: 600,
      minWidth: 200,
      minHeight: 300
    }
  },
  {
    index: 2,
    title: 'App2',
    isMinimized: false,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 50,
      minHeight: 50
    }
  },
  {
    index: 3,
    title: 'App3',
    isMinimized: false,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 200,
      minHeight: 200
    }
  },
  {
    index: 4,
    title: 'App4',
    isMinimized: false,
    dimensions: {
      width: 500,
      height: 500,
      minWidth: 200,
      minHeight: 200
    }
  }
])

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
    //Screen starting coordinates tell the offset value
    setContextCoordinates({x: e.pageX - screenStartingCoordinates.value.x, y: e.pageY - screenStartingCoordinates.value.y})
  }

  function handleMinimize(title: any){
    activeWindows.value =  activeWindows.value.map((window) =>{
      if (window.title !== title) {
        return window;
      }
      else return {
        ...window,
        isMinimized: true
      }
    })
  }

  function handleClose(title: any){
    // console.log(activeWindows.value, idx)
    activeWindows.value = activeWindows.value.filter((window) => (
      window.title !== title
    ))
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
      <div style={{backgroundColor:'white'}}>
        {JSON.stringify(activeWindows.value)}
      </div>
      {/* <span class='text-white'>{JSON.stringify(cursorCoord)}</span> */}
      {isRightClicked && <ContextMenu coordinates={contextCoordinates} />}

      {
        activeWindows.value.map((window, idx) => (
          !window.isMinimized && 
          <AppWindow 
            idx={window.index}
            title={window.title}
            isMinimized={window.isMinimized}
            dimensions={window.dimensions}
            handleMinimize={() => handleMinimize(window.title)}
            handleClose={() => handleClose(window.title)}
          />
        ))
      }
    </div>
  )
}

export default Screen
import { signal } from '@preact/signals';
import { Fragment, JSX, useEffect, useRef, useState } from 'preact/compat';

import { closeWindow, minimizeWindow } from '@utils/app_methods/app_window_handler';
import ContextMenu from '@components/ContextMenu/ContextMenu';
import AppWindow from '@components/AppWindow/AppWindow';
import { DemoApp } from 'src/apps';

import { contextMenuData } from '@utils/data/context_menu/contextMenuData';

import style from './Screen.module.css';

type WindowSignalParams = {
  windowId: number,
  isActive: boolean
}

export const screenStartingCoordinates = signal<ScreenCoordinates>({x:0,y:0});
export const presentFocusedWindow = signal<WindowSignalParams>({
  windowId: 0,
  isActive: false
});

export const generateUniquePID = (() => {
  let processID = 1000;
  return () => ++processID;
})();

export const createProcess = (AppConfig: any) => {
  const uniquePid = generateUniquePID();

  activeWindows.value = [
    ...activeWindows.value,
    {
      ...AppConfig,
      pid: uniquePid
    }
  ]

}

// export const activeWindows = signal<AppWindowConfig[]>([
export const activeWindows = signal<any[]>([])

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

  function handleCloseMenu() {
    setIsRightClicked(false);
  }

  function handleBlur(e: JSX.TargetedMouseEvent<HTMLDivElement>){
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleCloseMenu()
    }
  }

  return (
    <div
      ref={screenRef}
      tabIndex={0} //onBlur method requires a tabIndex other than -1
      onBlur={handleBlur}
      onClick={handleCloseMenu}
      onContextMenu={handleRightClick}
      id={style['screen-container']}
    >
      <div style={{backgroundColor:'white'}}>
      </div>
      <span style={{color:'white'}}>{JSON.stringify(presentFocusedWindow.value)}</span>
      {(isRightClicked && contextCoordinates) && (
        <ContextMenu coordinates={contextCoordinates} handleCloseMenu={handleCloseMenu}  menuData={contextMenuData} />
      )
      }

      {
        activeWindows.value.map((window) => (
            /*
              It becomes extremely necessary using a unique key in fragment else when the item from array will be removed,
              it will cause removing the last AppWindow component and shifting the activeWindows object one place backward.
              If this happens, then the value will be changed but the dimensions will be of the previous.
            */
            <Fragment key={window.pid}>
              <AppWindow
                data={window}
                handleMinimize={() => minimizeWindow(window)}
                handleClose={() => closeWindow(window)}
              />
            </Fragment>
        ))
      }
    </div>
  )
}

export default Screen
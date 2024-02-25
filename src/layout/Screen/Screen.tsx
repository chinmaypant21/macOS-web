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

export const activeWindows = signal<Array<AppWindowConfig>>([
  {
    index: 1,
    title: 'App1',
    isMinimized: false,
    dimensions: {
      width: 800,
      height: 600,
      minWidth: 200,
      minHeight: 300
    },
    application: DemoApp
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
            <Fragment key={window.index}>
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
import { computed, signal } from '@preact/signals';
import { Fragment, JSX, Suspense, lazy, useEffect, useRef, useState } from 'preact/compat';

import { closeWindow, maximizeWindow, minimizeWindow, showNormalWindow } from '@utils/app_methods/app_window_handler';
import ContextMenu from '@components/ContextMenu/ContextMenu';
const AppWindow = lazy(()  => import('@components/AppWindow/AppWindow'));

import { generateUniquePID } from '@utils/generatePid';
//Data
import { contextMenuData } from '@utils/data/context_menu/contextMenuData';


//Style
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

export const createProcess = (AppConfig: AppBaseConfig) : number => {
  const uniquePid = generateUniquePID();

  activeWindows.value = [
    ...activeWindows.value,
    {
      ...AppConfig,
      pid: uniquePid
    }
  ]

  return uniquePid;
}

export const activeWindows = signal<AppWindowConfig[]>([])

export const fullScreenWindows = computed(() => {
  return activeWindows.value.filter(window => window.isMaximized)
})

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
      <span style={{color:'white'}}>{JSON.stringify(fullScreenWindows.value)}</span>
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
              <Suspense fallback={<>Loading...</>}>
                <AppWindow
                  data={window}
                  handleMinimize={() => minimizeWindow(window.pid)}
                  handleClose={() => closeWindow(window.pid)}
                  handleMaximize={() => maximizeWindow(window.pid)}
                  showNormalWindow={() => showNormalWindow(window.pid)}
                />
              </Suspense>
            </Fragment>
        ))
      }
    </div>
  )
}

export default Screen
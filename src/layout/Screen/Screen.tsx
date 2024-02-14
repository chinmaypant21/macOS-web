import { JSX, TargetedEvent, useEffect, useState } from 'preact/compat';

import ContextMenu from '@components/ContextMenu/ContextMenu';

import style from './Screen.module.css';

const Screen = () => {
  const [ isRightClicked, setIsRightClicked] = useState<boolean>(false);
  const [ contextCoordinates, setContextCoordinates] = useState<{x: any, y: any}>();

  //remove
  const [cursorCoord, setCursorCoord] = useState<any>();
  
  function f(e: any){
    setCursorCoord({x: e.pageX, y: e.pageY})
  }

  useEffect(() => {
    
    // document.addEventListener('mousemove', f )

    // return() => removeEventListener('mousemove', f)
  },[])


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
      // onMouseMove={f}
      tabIndex={0} //onBlur method requires a tabIndex other than -1
      // onBlur={handleCloseMenu}
      onClick={handleCloseMenu}
      onContextMenu={handleRightClick}
      id={style['screen-container']}
    >
      {/* <span class='text-white'>{JSON.stringify(cursorCoord)}</span> */}
      {isRightClicked && <ContextMenu coordinates={contextCoordinates} />}
    </div>
  )
}

export default Screen
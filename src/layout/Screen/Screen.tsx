import { JSX, TargetedEvent, useState } from 'preact/compat';

import ContextMenu from '@components/ContextMenu/ContextMenu';

import style from './Screen.module.css';

const Screen = () => {
  const [ isRightClicked, setIsRightClicked] = useState<boolean>(false);
  const [ contextCoordinates, setContextCoordinates] = useState<{x: any, y: any}>();


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
      tabIndex={0} //onBlur method requires a tabIndex other than -1
      // onBlur={handleCloseMenu}
      onClick={handleCloseMenu}
      onContextMenu={handleRightClick}
      id={style['screen-container']}
    >
      {isRightClicked && <ContextMenu coordinates={contextCoordinates} />}
    </div>
  )
}

export default Screen
import { useEffect, useState } from 'preact/hooks'

import { getDisplayPosition } from '@utils/window';
import MenuList from './MenuList';

import style from './ContextMenu.module.css'

const menuDimensions = {
  width: 250,
  height: 200 //Have to make this dynamic
}

const ContextMenu = ({coordinates, isNested, handleCloseMenu} : any) => {
  const [positionStyle, setPositionStyle ] = useState<any>({top: -10000, left: -100000});

  function xx() {
    return {
      x: 250, y:null
    }
  }

  useEffect(() => {
    const {x: left, y: top} = isNested ? xx() : getDisplayPosition(coordinates, menuDimensions)
    setPositionStyle({left, top})
  },[coordinates])

  return (
    <div
      onMouseLeave={() => isNested && handleCloseMenu?.()}
      onClick={(e)=>{e.stopPropagation();e.preventDefault();}}
      onBlur={(e)=>{e.preventDefault();e.stopPropagation();}}
      class={style['context-container']} 
      style={{
        '--screen-context-menu-height': `${menuDimensions.height}px`,
        '--screen-context-menu-width': `${menuDimensions.width}px`,
        '--screen-context-menu-top': `${positionStyle.top}px`,
        '--screen-context-menu-left': `${positionStyle.left}px`
      }}
    >
      <MenuList />
    </div>
  )
}

export default ContextMenu
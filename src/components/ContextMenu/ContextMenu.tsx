import { useEffect, useState } from 'preact/hooks'
import style from './ContextMenu.module.css'
import { getDisplayPosition } from '@utils/window';

const menuDimensions = {
  width: 151.3,
  height: 79
}

const ContextMenu = ({coordinates} : any) => {
  const [positionStyle, setPositionStyle ] = useState<any>({top: -100, left: -100});

  useEffect(() => {
    const {x: left, y: top} = getDisplayPosition(coordinates, menuDimensions)
    setPositionStyle({left, top})
  },[coordinates])

  return (
    <div
      onClick={(e)=>{e.stopPropagation()}}
      class={style['context-container']} 
      style={{
        '--screen-context-menu-top': `${positionStyle.top}px`,
        '--screen-context-menu-left': `${positionStyle.left}px`
      }}
    >
      ContextMenu
    </div>
  )
}

export default ContextMenu
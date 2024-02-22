import { useEffect, useRef, useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime';

import { getDisplayPosition } from '@utils/window';
import MenuList from './MenuList';

import style from './ContextMenu.module.css'

interface ContextMenuProps {
  coordinates: ScreenCoordinates,
  isNested?: boolean,
  handleCloseMenu: () => void,
  menuData: ContextMenu
}

type StylePositionType = {
  top: string,
  left: string
}

const ContextMenu = ({coordinates, isNested, handleCloseMenu, menuData} : ContextMenuProps) => {
  const [positionStyle, setPositionStyle] = useState<StylePositionType>({top: '-10000px', left: '-100000px'});
  const elementRef = useRef<HTMLDivElement>(null);

  /*
    On mouse enter in the context menu regardless it is nested or not, focus the current context-menu
  */
  function handleMouseEnter(){
    elementRef.current?.focus();
  }

  function handleMenuBlur(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
    // Note: No need to stop propagation here as we actually do need the event to be propagated from the parent to ensure the parent blur works
    e.preventDefault();

    // To check if any of the nested children menu are focused. In that case, we don't need to close the menu
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      handleCloseMenu();

    }
  }

  useEffect(() => {
    elementRef.current && elementRef.current.focus();
  },[])
  
  useEffect(() => {
    if(elementRef.current){
      if(isNested){
        setPositionStyle({left: '100%', top: 'initial'})
      } 
      else {
        const menuDimensions = elementRef.current.getBoundingClientRect()

        const {x, y} = getDisplayPosition(coordinates, menuDimensions)
        const top  = `${y}px`;
        const left = `${x}px`;

        setPositionStyle({left, top})
      }
    }
  },[coordinates])

  return (
    <div
      ref={elementRef}
      tabIndex={0}
      // onMouseMove={(e)=>{e.stopPropagation();}}
      onClick={(e)=>{e.stopPropagation()}}
      onMouseEnter={handleMouseEnter}
      onBlur={handleMenuBlur}

      class={style['context-container']} 
      style={{
        '--screen-context-menu-top': positionStyle.top,
        '--screen-context-menu-left': positionStyle.left
      }}
    >
      <MenuList listData={menuData} />
    </div>
  )
}

export default ContextMenu
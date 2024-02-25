import { FC, Fragment, useState } from 'preact/compat'

import ContextMenu from './ContextMenu';

import ArrowIcon from '@assets/images/icons/mini/arrow_right.svg';

import style from './ContextMenu.module.css'

const MenuItem : FC<{item: ContextMenuItem, handleClose?: () => void, handlerProp?: any}> = ({item, handleClose, handlerProp}) => {
  const [ isNestedMenuOpen, setIsNestedMenuOpen ] = useState<boolean>(false);

  function handleClick(){
    if(!item.disabled && item.onclick){
      item.onclick(handlerProp);
    }

    if(!item.nestedMenu){
      handleClose?.()
    }
    else {
      setIsNestedMenuOpen(true);
    }

  }

  function handleCloseMenu(){
    setIsNestedMenuOpen(false)
  }

  return (
    <Fragment>
      {(isNestedMenuOpen && item.nestedMenu)  && (
          <div>
            <ContextMenu 
              coordinates={{x:0, y:0}} 
              isNested
              handleCloseMenu={handleCloseMenu}
              menuData={item.nestedMenu} 
            />
          </div>
        )
      }
      <li
        onClick={handleClick}
        class={`${style['list-item']} ${item.disabled ? style['item-disabled'] : ''}`}
      >
        {
          (item.icon) && (
            <img
              class={style['menu-item-image']}
              src={item.icon} 
            />
          )
        }
        <span>{item.text}</span>
        {
          item.nestedMenu &&
          <div class={style['item-icon-container']}>
            <img src={ArrowIcon} />
          </div>
        }
      </li>
    </Fragment>
  )
}

const DropMenu = ({listData, handlerProp, handleClose}: any) => {
  return (
    <div class={style['menu-container']}>
      <ul
        class={style['menu-list']}
      >
        {
          listData.map((itemGroup: any, idx: number) => (
            <Fragment key={itemGroup.groupKey}>
            {
              itemGroup.items.map((menuItem: any, idx: any) => (
                <Fragment key={idx}>
                  <MenuItem item={menuItem} handleClose={handleClose} handlerProp={handlerProp} />
                </Fragment>
              ))
            }
            {
              (idx !== listData.length-1) && 
              <span class={style['menu-group-divider']} />
            }
            </Fragment>
          ))
        }
      </ul>
    </div>

  )
}

export default DropMenu
import { Fragment, useState } from 'preact/compat'

import ContextMenu from './ContextMenu';

import ArrowIcon from '@assets/images/icons/mini/arrow_right.svg';

import style from './ContextMenu.module.css'

const MenuItem = ({item}: any) => {
  const [ isNestedMenuOpen, setIsNestedMenuOpen ] = useState<boolean>(false);

  function handleClick(){
    if(item.onclick){
      item.onclick();
    }

    if(item.nestedMenu) {
      setIsNestedMenuOpen(true);
    }
  }

  return (
    <Fragment>
      {isNestedMenuOpen && (
          <div
          >
            <ContextMenu coordinates={{x:0, y:0}} isNested handleCloseMenu={() => setIsNestedMenuOpen(false)} menuData={item.nestedMenu} />
          </div>
        )
      }
      <li
        onClick={handleClick}
        // tabIndex={1}
        onBlur={() => {console.log('blur');setIsNestedMenuOpen(false)}}

        class={style['list-item']}
      >
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

const MenuList = ({listData}: any) => {
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
                  <MenuItem item={menuItem} />
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

export default MenuList
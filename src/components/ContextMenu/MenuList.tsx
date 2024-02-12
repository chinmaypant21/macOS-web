import { Fragment, useState } from 'preact/compat'

import ContextMenu from './ContextMenu';

import ArrowIcon from '@assets/images/icons/mini/arrow_right.svg';

import style from './ContextMenu.module.css'

const data = [
  {
    groupKey: 'g1',
    items: [
      {text: 'New folder', onclick: () => console.log('clicked'), nestedMenu: null},
    ]
  },
  {
    groupKey: 'g2',
    items: [
      {text: 'Get Info', onclick: () => console.log('clicked3'), nestedMenu: true},
      {text: 'Change Desktop Background', onclick: () => console.log('clicked4'), nestedMenu: null},
    ]
  },
  {
    groupKey: 'g3',
    items: [
      {text: 'Use Stacks', onclick: () => console.log('clicked5'), nestedMenu: null},
      {text: 'Sort By', onclick: () => console.log('clicked6'), nestedMenu: true},
      {text: 'Show View Options', onclick: () => console.log('clicked7'), nestedMenu: null},
    ]
  }
]

const MenuItem = ({data}: any) => {
  const [ isNestedMenuOpen, setIsNestedMenuOpen ] = useState<boolean>(false);

  function handleClick(){
    console.log('a1')
    if(data.nestedMenu) {
      setIsNestedMenuOpen(true);
    }
  }

  return (
    <Fragment>
      {isNestedMenuOpen && (
          <div
          >
            <ContextMenu coordinates={{x:0, y:0}} isNested handleCloseMenu={() => setIsNestedMenuOpen(false)} />
          </div>
        )
      }
      <li
        onClick={handleClick}
        // tabIndex={1}
        onBlur={() => {console.log('blur');setIsNestedMenuOpen(false)}}

        class={style['list-item']}
      >
        <span>{data.text}</span>
        {
          data.nestedMenu &&
          <div class={style['item-icon-container']}>
            <img src={ArrowIcon} />
          </div>
        }
      </li>
    </Fragment>
  )
}

const MenuList = () => {
  return (
    <ul
      class={style['menu-list']}
    >
      {
        data.map((itemGroup, idx) => (
          <Fragment key={itemGroup.groupKey}>
          {
            itemGroup.items.map((menuItem,idx) => (
              <Fragment key={idx}>
                <MenuItem data={menuItem} />
              </Fragment>
            ))
          }
          {
            (idx !== data.length-1) && 
            <span class={style['menu-group-divider']} />
          }
          </Fragment>
        ))
      }
    </ul>
  )
}

export default MenuList
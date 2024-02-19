
import { activeWindows, presentFocusedWindow } from '@layout/Screen/Screen'
import style from './Dock.module.css'

const Dock = () => {
  function handleClick(selected_window: any){
    if(selected_window.isMinimized) {
      activeWindows.value = activeWindows.value.map((window) => {
          if(window.index !== selected_window.index) {
            return window
          } 
          else {
            return {
              ...window,
              isMinimized: false
            }
          }
      })

      presentFocusedWindow.value = {
        isActive: true,
        windowId: selected_window.index
      }
    }

    else if(
      (selected_window.index === presentFocusedWindow.value.windowId) 
      // && presentFocusedWindow.value.isActive
    ){
      console.log('hh2')
      activeWindows.value = activeWindows.value.map((window) => {
        if(window.index !== selected_window.index) {
          return window
        } 
        else {
          return {
            ...window,
            isMinimized: true
          }
        }
      })

      presentFocusedWindow.value = {
        windowId: 0,
        isActive: false
      }
    }

    else{
      console.log('hh3')
      presentFocusedWindow.value = {
        isActive: true,
        windowId: selected_window.index
      }
    }
  }

  return (
    <section id={style['dock-body']}>
      <div class={style['dock-container']}>
      {
        activeWindows.value.map((window) => (
          <div
            onClick={()=>{handleClick(window)}}
            class={style['dock-item']}
          >
            <span class={style['app-icon']}>{window.title}</span>
            <div 
              style={!window.isMinimized ? {backgroundColor: 'var(--color-green)' } : {}}
              class={style['active-indicator']}
            >
            </div>
          </div>
        ))
      }
      </div>
    </section>
  )
}

export default Dock
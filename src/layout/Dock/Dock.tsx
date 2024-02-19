
import { activeWindows } from '@layout/Screen/Screen'
import style from './Dock.module.css'

const Dock = () => {
  activeWindows
  return (
    <section id={style['dock-body']}>
      <div class={style['dock-container']}>
      {
        activeWindows.value.map((window,idx) => (
          <div class={style['dock-item']}>
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
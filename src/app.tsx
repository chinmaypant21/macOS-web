import { FC, useEffect, useState } from 'preact/compat'
import { ComponentChildren } from 'preact'

import Menubar from '@layout/Menubar/Menubar'
import Screen from '@layout/Screen/Screen'
import Dock from '@layout/Dock/Dock'
import { getClassicDateTime } from '@utils/time/getFormattedDateTime'

// Styles
import '@styles/app.css'

//Data
// import ProfileImg from '@assets/images/avatars/7980297.gif'
import ProfileImg from '@assets/images/avatars/8574074.gif'

const HomeScreen = () => {
  return (
    <main id='desktop-container'>
      <Menubar />
      <Screen />
      <Dock />
    </main>
  )
}

const LockScreen: FC<{ children: ComponentChildren }> = ({ children }) => {
  const [promptActive, setPromptActive] = useState<boolean>(false);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<any>({ date: '', time: '' });

  function handleClick(e: any) {
    e.preventDefault()
    setPromptActive(true)
  }

  function handleKeyPress(event: any) {
    if (!promptActive) return;
    if (event.key === 'Escape') {
      setPromptActive(false)
    }
    if (event.key === 'Enter') {
      setIsEntered(true);
    }
  }

  useEffect(() => {
    const { date, time } = getClassicDateTime(new Date())
    setDateTime({ date, time });

    setInterval(() => {
      const { date, time } = getClassicDateTime(new Date())
      setDateTime({ date, time });
    }, 1000)
  }, [])

  if (promptActive && isEntered) {
    return <>{children}</>;
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      id={`lock-screen`}
      class={promptActive ? 'blur-lock-screen' : ''}
    >
      <div class={'lock-container'}>
        {
          promptActive ? 
          <>
            <div class={`lock-profile-container`}>
              <img src={ProfileImg} />
              <span class={'lock-name'}>Chinz</span>
            </div>
            <div>
              Press Enter to Continue
            </div>
          </>

          : (
            <div class={'lock-prompt-inactive'}>
              <div class={'lock-datetime-container'}>
                  <span class={'lock-date'}>{dateTime.date}</span>

                  <div class={'lock-time-container'}>
                  <span class={'lock-time'}>{dateTime.time}</span>
                  </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export function App() {

  return (
    <LockScreen>
      <HomeScreen />
    </LockScreen>
  )
}

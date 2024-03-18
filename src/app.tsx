import { FC, useEffect, useMemo, useState } from 'preact/compat'
import { ComponentChildren } from 'preact'
import { signal } from '@preact/signals'

import Menubar from '@layout/Menubar/Menubar'
import Screen from '@layout/Screen/Screen'
import Dock from '@layout/Dock/Dock'

import { getClassicDateTime } from '@utils/time/getFormattedDateTime'
import { getGreetMessage } from '@utils/time/getTimeMsg'

// Styles
import '@styles/app.css'

//Data
// import ProfileImg from '@assets/images/avatars/7980297.gif'
import ProfileImg from '@assets/images/avatars/8574074.gif'
import CancelBtnImg from '@assets/images/icons/mini/cancel_btn.svg'

const HomeScreen = () => {
  return (
    <main id='desktop-container'>
      <Menubar />
      <Screen />
      <Dock />
    </main>
  )
}

export const isLoggedIn = signal<boolean>(true);

const LockScreen: FC<{ children: ComponentChildren }> = ({ children }) => {
  const [promptActive, setPromptActive] = useState<boolean>(false);
  // const [isEntered, setIsEntered] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<any>({ date: '', time: '' });

  const greetMessage = useMemo(() => {
    return getGreetMessage(new Date())
  },[])

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
      setPromptActive(false);
      isLoggedIn.value = true;
      // setIsEntered(true);
    }
  }

  function handleCancel(e: any){
    e.stopPropagation();
    setPromptActive(false)
  }

  useEffect(() => {
    const { date, time } = getClassicDateTime(new Date())
    setDateTime({ date, time });

    setInterval(() => {
      const { date, time } = getClassicDateTime(new Date())
      setDateTime({ date, time });
    }, 1000)
  }, [])

  if (isLoggedIn.value) {
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
              <span>Press Enter to Continue</span>
            </div>
            <div onClick={handleCancel} class={'lock-cancel'}>
              <img src={CancelBtnImg} />
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


              <div class={'lock-inactive-profile'}>
                <div class={'lock-greet'}>{`${greetMessage}, User`}</div>
                <span class={'lock-inactive-img-container'}>
                  <img src={ProfileImg} />
                </span>
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

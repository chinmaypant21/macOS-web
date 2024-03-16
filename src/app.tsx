import { FC, useEffect, useState } from 'preact/compat'
import { ComponentChildren } from 'preact'

import Menubar from '@layout/Menubar/Menubar'
import Screen from '@layout/Screen/Screen'
import Dock from '@layout/Dock/Dock'

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

  function handleClick(e: any) {
    e.preventDefault()
    setPromptActive(prev => !prev)
  }

  function handleKeyPress(event: any) {
    if(!promptActive) return;
    if (event.key === 'Enter') {
      setIsEntered(true);
    }
  }

  if (promptActive && isEntered){
    return <>{children}</>;
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      tabIndex={0}
      onKeyPress={handleKeyPress}
      id={`lock-screen`}
      class={promptActive ? 'blur-lock-screen' : ''}
    >
      {
        promptActive &&
        <div class={'lock-container'}>
          <div class={`lock-profile-container`}>
            <img src={ProfileImg} />
            <span class={'lock-name'}>Chinz</span>
          </div>
          <div>
            Press Enter to Continue
          </div>
        </div>
      }
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

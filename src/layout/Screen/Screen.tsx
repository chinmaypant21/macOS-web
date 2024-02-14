import { JSX, TargetedEvent, useEffect, useRef, useState } from 'preact/compat';

import ContextMenu from '@components/ContextMenu/ContextMenu';

import style from './Screen.module.css';

const AppWindow = () => {
  const [pressed, setPressed] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (event : any) => {
    // console.log(event)
    if (pressed) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + event.movementX,
        y: prevPosition.y + event.movementY
      })
      )
    }
  }

  useEffect(() =>{console.log('aaaa')},[])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  return (
    <div
      // onDragOver={onMouseMove}
      // onDrag={onMouseMove}
      onMouseMove={ onMouseMove }
      onMouseLeave={() => {setPressed(false)}}
      onMouseUp={() => {console.log('up'); setPressed(false)}}
      onMouseDown={ () => {console.log('down'); setPressed(true)} }
      ref={ref}
      class={'app-window'}
      // draggable
      style={{height:'50px', width:'50px', backgroundColor:'white'}}
    >

    </div>
  )
}

const Screen = () => {
  const [ isRightClicked, setIsRightClicked] = useState<boolean>(false);
  const [ contextCoordinates, setContextCoordinates] = useState<{x: any, y: any}>();

  //remove
  const [cursorCoord, setCursorCoord] = useState<any>();
  
  function f(e: any){
    setCursorCoord({x: e.pageX, y: e.pageY})
  }

  useEffect(() => {
    
    // document.addEventListener('mousemove', f )

    // return() => removeEventListener('mousemove', f)
  },[])


  function handleRightClick(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsRightClicked(true);
    setContextCoordinates({x: e.pageX, y: e.pageY})
  }

  function handleCloseMenu() {
    setIsRightClicked(false);
  }

  return (
    <div
      tabIndex={0} //onBlur method requires a tabIndex other than -1
      // onBlur={handleCloseMenu}
      onClick={handleCloseMenu}
      onContextMenu={handleRightClick}
      id={style['screen-container']}
    >
      {/* <span class='text-white'>{JSON.stringify(cursorCoord)}</span> */}
      {isRightClicked && <ContextMenu coordinates={contextCoordinates} />}


    <AppWindow />
    </div>
  )
}

export default Screen
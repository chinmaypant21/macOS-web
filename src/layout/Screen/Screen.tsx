import style from './Screen.module.css';

const Screen = () => {
  return (
    <div
      onContextMenu={(a) => {console.log('hi',a)}}
      id={style['screen-container']}
    >
      
    </div>
  )
}

export default Screen
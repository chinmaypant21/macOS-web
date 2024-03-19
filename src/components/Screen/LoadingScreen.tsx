import LoadingImg from '@assets/images/spinner.gif'

import style from './loading.module.css'

const LoadingScreen = () => {
  return (
    <div class={style['loader-container']}>
        <img src={LoadingImg} />
    </div>
  )
}

export default LoadingScreen
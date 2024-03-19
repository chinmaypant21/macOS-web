import LoadingImg from '@assets/images/spinner.gif'

import style from './loading.module.css'

const LoadingScreen = ({title}: any) => {
  return (
    <div class={style['loader-container']}>
        <img src={LoadingImg} />
        <div>
          <span>{title ?? 'Loading Application'}</span>
          <br/>
          <span>It'll just take a moment.</span>
        </div>
    </div>
  )
}

export default LoadingScreen
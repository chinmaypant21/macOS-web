import PackageImg from '@assets/images/package.webp'

import style from './loading.module.css'

const AppScreen = () => {
  return (
    <div class={style['app-screen']}>
        <img src={PackageImg} />
        <span>Oops!<br/>This App is under development 🚧</span>

    </div>
  )
}

export default AppScreen
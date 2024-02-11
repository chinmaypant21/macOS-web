import { useEffect, useState } from 'preact/hooks'

import { getFormattedDateTime } from '@utils/time/getFormattedDateTime';

import logo from '@assets/images/apple_logo.svg'
import bluetoothLogo from '@assets/images/icons/bluetooth.svg'
import wifiLogo from '@assets/images/icons/wifi.svg'
import controlCenterLogo from '@assets/images/icons/control_center.svg'
import searchLogo from '@assets/images/icons/search.svg'
import siriLogo from '@assets/images/icons/siri.png'
import volumeLogo from '@assets/images/icons/volume.svg'
import batteryLogo from '@assets/images/icons/battery_empty.svg'

import style from './Menubar.module.css'

const Menubar = () => {
    const [ displayTime, setDisplayTime ] = useState<{date: string, time: string}>()

    useEffect(() => {
        const updateTime = () => {
            setDisplayTime(getFormattedDateTime(new Date()))
        }

        updateTime();
        const timeIntervalID = setInterval(updateTime, 1000)

        return () => clearInterval(timeIntervalID);

        // window.navigator.getBattery().then((battery) => {
        //     battery.addEventListener("chargingchange", () => {
        //         console.log(battery, 'hi')
        //     })
        // });
    },[])

    return (
        <div id={style['menubar-container']}>
            <div class={style['menu-list-left']}>
                <div id={style['menu-logo']}>
                    <img src={logo} />
                </div>

                <button class={style['list-item']}>
                    Finder
                </button>

                <button class={style['list-item']}>
                    File
                </button>

                <button class={style['list-item']}>
                    Edit
                </button>

                <button class={style['list-item']}>
                    View
                </button>

                <button class={style['list-item']}>
                    Go
                </button>

                <button class={style['list-item']}>
                    Window
                </button>

                <button class={style['list-item']}>
                    Help
                </button>
            </div>

            <div class={style['menu-tools'] + ' cursor-pointer'}>
                <span class={style['tool-icon']}><img src={bluetoothLogo} alt='bluetooth' /></span>
                <span class={style['tool-icon']}><img src={volumeLogo} alt='volume' /></span>
                <span class={style['tool-icon']}><img src={wifiLogo} alt='wifi' /></span>
                <span class={style['tool-icon']}><img src={batteryLogo} alt='battery' /></span>
                <span class={style['tool-icon']}><img src={searchLogo} alt='search' /></span>
                <span class={style['tool-icon']}><img src={controlCenterLogo} alt='control center' /></span>
                <span class={style['tool-icon']}><img src={siriLogo} alt='siri' /></span>
                <span class={style['menu-clock']}>{displayTime?.date}&nbsp;&nbsp;{displayTime?.time}</span>
            </div>
        </div>
    )
}

export default Menubar
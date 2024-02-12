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
import { JSX } from 'preact/jsx-runtime';

const Menubar = () => {
    const [ displayTime, setDisplayTime ] = useState<{date: string, time: string}>();

    function handleRightClick(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

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
        <div
            onContextMenu={handleRightClick}
            id={style['menubar-container']}
        >
            <div class={style['menu-list-left']}>
                <div id={style['menu-logo']}>
                    <img src={logo} />
                </div>

                <span id={style['finder']} class={style['list-item']}>
                    Finder
                </span>

                <span class={style['list-item']}>
                    File
                </span>

                <span class={style['list-item']}>
                    Edit
                </span>

                <span class={style['list-item']}>
                    View
                </span>

                <span class={style['list-item']}>
                    Go
                </span>

                <span class={style['list-item']}>
                    Window
                </span>

                <span class={style['list-item']}>
                    Help
                </span>
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
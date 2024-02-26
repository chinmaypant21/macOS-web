import { JSX } from 'preact/jsx-runtime';
import { useEffect, useState } from 'preact/hooks'

import DropMenu from '@components/ContextMenu/DropMenu';
import { getFormattedDateTime } from '@utils/time/getFormattedDateTime';
import {fileMenuData, editMenuData, viewMenuData, goMenuData, windowMenuData, helpMenuData, appleMenuData } from '@utils/data/drop_menu';

import logo from '@assets/images/apple_logo.svg'
import bluetoothLogo from '@assets/images/icons/bluetooth.svg'
import wifiLogo from '@assets/images/icons/wifi.svg'
import controlCenterLogo from '@assets/images/icons/control_center.svg'
import searchLogo from '@assets/images/icons/search.svg'
import siriLogo from '@assets/images/icons/siri.webp'
import volumeLogo from '@assets/images/icons/volume.svg'
// import batteryLogo from '@assets/images/icons/battery.svg'

import style from './Menubar.module.css'

type MenuOptionType = {
    id?: string,
    title: string,
    dropMenu?: ContextMenu

}

const MenuOptions : MenuOptionType[] = [
    {
        title: 'Finder',
        id: 'finder',
    },
    {
        title: 'File',
        dropMenu: fileMenuData,
    },
    {
        title: 'Edit',
        dropMenu: editMenuData,
    },
    {
        title: 'View',
        dropMenu: viewMenuData,
    },
    {
        title: 'Go',
        dropMenu: goMenuData,
    },
    {
        title: 'Window',
        dropMenu: windowMenuData,
    },
    {
        title: 'Help',
        dropMenu: helpMenuData,
    }
]

const Menubar = () => {
    const [ displayTime, setDisplayTime ] = useState<{date: string, time: string}>();

    function handleRightClick(e: JSX.TargetedMouseEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    useEffect(() => {
        // const tempBatteryVal = 80

        // maxWidth = 

    },[])

    useEffect(() => {
        const updateTime = () => {
            setDisplayTime(getFormattedDateTime(new Date()))
        }

        updateTime();
        const timeIntervalID = setInterval(updateTime, 1000)

        // window.navigator.getBattery().then((battery) => {
        //     console.log(battery)
        //     battery.addEventListener("chargingchange", () => {
        //         console.log(battery, 'hi')
        //     })
        // });
        
        return () => clearInterval(timeIntervalID);

    },[])

    return (
        <div
            tabIndex={0}
            onContextMenu={handleRightClick}
            id={style['menubar-container']}
        >
            <div class={style['menu-list-left']}>
                <div
                    tabIndex={0}
                    class={style['menu-item-container']}
                >

                    <div id={style['menu-logo']}>
                        <img src={logo} />
                    </div>
                    {
                        <div class={style['dropdown-wrapper']}>
                            <DropMenu listData={appleMenuData} />
                        </div>
                    }
                </div>
                {
                    MenuOptions.map(option => (
                        <div
                            tabIndex={0}
                            id={option.id ? style[option.id] : ''} //Check
                            class={`${style['list-item']} ${(option.dropMenu) ? style['menu-item-container'] : ''}`}
                        >
                            <span>{option.title}</span>
                            {
                                (option.dropMenu) && 
                                <div class={style['dropdown-wrapper']}>
                                    <DropMenu listData={option.dropMenu} />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

            <div class={style['menu-tools'] + ' cursor-pointer'}>
                <span class={style['tool-icon']}><img src={bluetoothLogo} alt='bluetooth' /></span>
                <span class={style['tool-icon']}><img src={volumeLogo} alt='volume' /></span>
                <span class={style['tool-icon']}><img src={wifiLogo} alt='wifi' /></span>
                <span class={style['tool-icon']}>
                    <div id={style['battery-container']}>
                        <span>80</span>
                    </div>
                </span>
                <span class={style['tool-icon']}><img src={searchLogo} alt='search' /></span>
                <span class={style['tool-icon']}><img src={controlCenterLogo} alt='control center' /></span>
                <span class={style['tool-icon']}><img src={siriLogo} alt='siri' /></span>
                <span class={style['menu-clock']}>{displayTime?.date}&nbsp;&nbsp;{displayTime?.time}</span>
            </div>
        </div>
    )
}

export default Menubar
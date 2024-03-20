import { commonPathMenu } from "./commonPathMenu";
import { sortMenu } from "./sortMenu";

import { createProcess } from "src/layout/Screen/Screen";
import { focusWindow } from "@utils/app_methods/app_window_handler";

//Data
import { appConfigStore } from "@store/appConfigStore";

//Images
import VSCodeIcon from '@assets/images/icons/menu/code.png'
import TerminalIcon from '@assets/images/icons/menu/terminal.png'
import FavouriteIcon from '@assets/images/icons/menu/favourite.png'

export const contextMenuData: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'New folder', onclick: () => console.log('clicked') },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Get Info', onclick: () => console.log('clicked3') },
            { text: 'Change Desktop Background', onclick: () => console.log('clicked4') },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Use Stacks', onclick: () => console.log('clicked5') },
            { text: 'Sort By', onclick: () => console.log('clicked6'), nestedMenu: sortMenu },
            { text: 'Show View Options', onclick: () => console.log('clicked7') },
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Copy Path', onclick: () => console.log('clicked5') },
            { text: 'Common Path', onclick: () => console.log('clicked5'), icon: FavouriteIcon, nestedMenu: commonPathMenu },
            { text: 'Open in VSCode', onclick: () => openApp('visual-studio-code'), icon: VSCodeIcon },
            { text: 'Open in Terminal', onclick: () => openApp('terminal'), icon: TerminalIcon },
        ]
    }
]

function openApp(appId: string){
    const pid = createProcess(appConfigStore[appId])
    focusWindow(pid)

}
import { isLoggedIn } from "src/app"

function handleLock(){
    isLoggedIn.value = false;
}

export const appleMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'About This Mac', onclick: () => console.log('s')},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'System Preferences...', onclick: () => console.log('s') },
            { text: 'App Store...', onclick: () => console.log('d'), disabled: true},
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Recent Items', onclick: () => console.log('d') },
        ]
    },
    // {
    //     groupKey: 'g4',
    //     items: [
    //         { text: 'Force Quit Finder', onclick: () => console.log('s') },
    //     ]
    // },
    {
        groupKey: 'g5',
        items: [
            { text: 'Sleep', onclick: () => console.log('s')},
            { text: 'Restart...', onclick: () => console.log('d')},
            { text: 'Shut Down...', onclick: () => console.log('d'), disabled: true },
        ]
    },
    {
        groupKey: 'g6',
        items: [
            { text: 'Lock Screen', onclick: handleLock },
            { text: 'Log Out Chinz', onclick: handleLock },
        ]
    },
]
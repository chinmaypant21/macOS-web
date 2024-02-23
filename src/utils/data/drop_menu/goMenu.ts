export const goMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Back', onclick: () => console.log('s'), disabled: true },
            { text: 'Forward', onclick: () => console.log('d'), disabled: true },
            { text: 'Select Startup Disk', onclick: () => console.log('d') },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Recents', onclick: () => console.log('asc') },
            { text: 'Documents', onclick: () => console.log('desc') },
            { text: 'Desktop', onclick: () => console.log('desc') },
            { text: 'Downloads', onclick: () => console.log('desc') },
            { text: 'Home', onclick: () => console.log('desc') },
            { text: 'Computer', onclick: () => console.log('desc') },
            { text: 'AirDrop', onclick: () => console.log('desc') },
            { text: 'Network', onclick: () => console.log('desc') },
            { text: 'Utilities', onclick: () => console.log('desc') },
            { text: 'Applications', onclick: () => console.log('desc') },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Recent Folders', onclick: () => console.log('s')},
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Go to Folder...', onclick: () => console.log('s')},
            { text: 'Connect to Server...', onclick: () => console.log('s')},
        ]
    },
]
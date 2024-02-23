export const fileMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'New Finder Window', onclick: () => console.log('s') },
            { text: 'New Folder', onclick: () => console.log('d') },
            { text: 'New Tab', onclick: () => console.log('d') },
            { text: 'Open', onclick: () => console.log('d') },
            { text: 'Open With', onclick: () => console.log('d'), disabled: true },
            { text: 'Close Window', onclick: () => console.log('d'), disabled: true },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Get Info', onclick: () => console.log('asc') },
            { text: 'Rename', onclick: () => console.log('desc') },
            { text: 'Duplicate', onclick: () => console.log('desc') },
            { text: 'Make Alias', onclick: () => console.log('desc') },
            { text: 'Print', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Share', onclick: () => console.log('desc')},
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Show Original', onclick: () => console.log('desc'), disabled: true},
            { text: 'Add to Sidebar', onclick: () => console.log('desc')},
        ]
    },
    {
        groupKey: 'g5',
        items: [
            { text: 'Move to Trash', onclick: () => console.log('desc')},
            { text: 'Eject', onclick: () => console.log('desc'), disabled: true},
        ]
    },
    {
        groupKey: 'g6',
        items: [
            { text: 'Find', onclick: () => console.log('desc')},
        ]
    }
]
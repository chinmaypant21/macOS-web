const optionsMenu: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Remove from Dock', onclick: () => console.log('s'), disabled: true},
            { text: 'Open at Login', onclick: () => console.log('s'), disabled: true},
            { text: 'Show in Finder', onclick: () => console.log('s'), disabled: true},
        ]
    }
]

export const dockMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Options', onclick: () => console.log('s'), nestedMenu: optionsMenu},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Hide', onclick: () => console.log('s')},
            { text: 'Show All Windows', onclick: () => console.log('s'), disabled: true},
            { text: 'Quit', onclick: () => console.log('s')},
        ]
    },
]
export const optionsMenu: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Remove from Dock', onclick: () => console.log('s'), disabled: true},
            { text: 'Open at Login', onclick: () => console.log('s')},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Show in Finder', onclick: () => console.log('s'), disabled: true},
        ]
    }
]
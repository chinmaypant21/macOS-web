export const viewMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Size', onclick: () => console.log('s') },
            { text: 'Date Modified', onclick: () => console.log('d') },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'A to Z', onclick: () => console.log('asc') },
            { text: 'Z to A', onclick: () => console.log('desc') },
        ]
    },
]
export const windowMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Minimize', disabled: true },
            { text: 'Zoom', disabled: true },
            { text: 'Tile Window to Left of Screen', disabled: true },
            { text: 'Tile Window to Right of Screen', disabled: true },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Remove Window from Set', onclick: () => console.log('asc'), disabled: true },
            { text: 'Cycle Through Windows', onclick: () => console.log('desc') },
            { text: 'Show Progress Window', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Show Previous Tab', onclick: () => console.log('asc'), disabled: true },
            { text: 'Show Next Tab', onclick: () => console.log('desc'), disabled: true },
            { text: 'Merge All Windows', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Bring All to Front', onclick: () => console.log('desc'), disabled: true },
        ]
    },
]
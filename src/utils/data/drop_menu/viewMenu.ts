const GroupStacksMenu: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'None'},
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Kind'},
            { text: 'Date Last Opened' },
            { text: 'Date Added'},
            { text: 'Date Modified'},
            { text: 'Date Created'},
            { text: 'Tags'},
        ]
    },
]

export const viewMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'as Icons', onclick: () => console.log('s'), disabled: true },
            { text: 'as List', onclick: () => console.log('d'), disabled: true },
            { text: 'as Columns', onclick: () => console.log('d'), disabled: true },
            { text: 'as Gallery', onclick: () => console.log('d'), disabled: true },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Use Stacks', onclick: () => console.log('asc') },
            { text: 'Group Stacks By', onclick: () => console.log('desc'), nestedMenu: GroupStacksMenu },
            { text: 'Clean Up', onclick: () => console.log('desc'), disabled: true },
            { text: 'Clean Up By', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Hide Toolbar', onclick: () => console.log('asc'), disabled: true },
            { text: 'Show All Tabs', onclick: () => console.log('desc'), disabled: true },
            { text: 'Hide Tab Bar', onclick: () => console.log('desc'), disabled: true },
            { text: 'Show Path Bar', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Show View Options', onclick: () => console.log('asc'), disabled: true },
            { text: 'Show Preview Options', onclick: () => console.log('desc'), disabled: true },
        ]
    },
    {
        groupKey: 'g5',
        items: [
            { text: 'Enter Full Screen', onclick: () => console.log('asc'), disabled: true },
        ]
    },
]
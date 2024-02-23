const CopyAsMenu: ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Markdown' },
            { text: 'HTML' },
            { text: 'Plain Text' },
            { text: 'Rich Text' },

        ]
    }
]

export const editMenuData : ContextMenu = [
    {
        groupKey: 'g1',
        items: [
            { text: 'Undo', onclick: () => console.log('s') },
            { text: 'Redo', onclick: () => console.log('d'), disabled: true },
        ]
    },
    {
        groupKey: 'g2',
        items: [
            { text: 'Cut', onclick: () => console.log('asc') },
            { text: 'Copy', onclick: () => console.log('desc') },
            { text: 'Paste...', onclick: () => console.log('desc') },
            { text: 'Delete', onclick: () => console.log('desc') },
            { text: 'Select All', onclick: () => console.log('desc') },
        ]
    },
    {
        groupKey: 'g3',
        items: [
            { text: 'Select All', onclick: () => console.log('asc') },
            { text: 'Copy as', onclick: () => console.log('desc'), nestedMenu: CopyAsMenu },
            { text: 'Paste as', onclick: () => console.log('desc') },
            { text: 'Paste from', onclick: () => console.log('desc') },
        ]
    },
    {
        groupKey: 'g4',
        items: [
            { text: 'Move Line Up', onclick: () => console.log('asc') },
            { text: 'Move Line Down', onclick: () => console.log('desc') },
        ]
    },
]
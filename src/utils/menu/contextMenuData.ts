import { commonPathMenu } from "./commonPathMenu";
import { sortMenu } from "./sortMenu";

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
            { text: 'Common Path', onclick: () => console.log('clicked5'), nestedMenu: commonPathMenu },
            { text: 'Open in VSCode', onclick: () => console.log('clicked5') },
            { text: 'Open in Terminal', onclick: () => console.log('clicked5') },
        ]
    }
]
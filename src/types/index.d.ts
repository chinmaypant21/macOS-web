type ScreenCoordinates = {
    x: number,
    y: number
}

type Dimension = {
    width: number,
    height: number
}

interface WindowDimension extends Dimension {
    minWidth: number,
    minHeight: number
}

type ContextMenuItem = {
    text: string,
    onclick?: () => void,
    icon?: string,
    nestedMenu?: ContextMenu,
    disabled?: boolean
}

type ContextMenu = Array<{
    groupKey: string | number,
    items: ContextMenuItem[]
}>
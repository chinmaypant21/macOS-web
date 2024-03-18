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
    onclick?: (handlerProps?: any) => void,
    icon?: string,
    nestedMenu?: ContextMenu,
    disabled?: boolean
}

type ContextMenu = Array<{
    groupKey: string | number,
    items: ContextMenuItem[]
}>

type AppBaseConfig = {
    id: any, 
    title: string, 
    isMinimized: boolean, 
    dimensions: WindowDimension,
    icon?: any
}

interface AppWindowConfig extends AppBaseConfig {
    pid: number
}
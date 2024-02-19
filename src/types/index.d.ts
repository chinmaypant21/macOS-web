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
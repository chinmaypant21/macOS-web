type elementDimensionType = {
  width: number,
  height: number
}

type coordinate = {
  x: number,
  y: number
}

export function getDisplayPosition(mouse_coordinates: coordinate, elementDimension: elementDimensionType) : coordinate {

    const offsetX = 5;
    // const offsetY = 6.5;

    var leftPos = 0
    var topPos  = 0

    if (mouse_coordinates.x < window.innerWidth - elementDimension.width) {
      leftPos = mouse_coordinates.x;
    } else {
      leftPos = (mouse_coordinates.x - elementDimension.width);
    }

    if (mouse_coordinates.y < window.innerHeight - elementDimension.height){
      topPos = mouse_coordinates.y
    } else {
      topPos = (mouse_coordinates.y - elementDimension.height)
    }

    return {x: (leftPos + offsetX), y: (topPos)}
  }
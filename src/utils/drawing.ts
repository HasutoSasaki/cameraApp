interface Point {
    x: number;
    y: number;
}

const STROKE_WIDTH = 2;

export const calculateLineSegmentStyle = (start: Point, end: Point) => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return {
        left: start.x,
        top: start.y - STROKE_WIDTH / 2,
        width: length,
        transform: [{ rotate: `${angleInDegrees}deg` }],
    };
};
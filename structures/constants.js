/* General */
// gravitational constant
export const G_CONSTANT = 0.5;
// mass of the "earth"
export const WORLD_MASS = 50000;
// distance to the "center" of the world, used for gravity
// effects. the distance is kept large enough so that
// variations in the distance of attracted objects also
// affect the magnitude of the force of gravity, but at
// the same time their effect is not so large that at
// close distances the force is extremely large, or at
// large distances the force is extremely small. essentially,
// if this number is larger, then the attracted object's distance
// from the ground will matter less, if small then it will
// have very strong affects on the gravitational force.
// TL;DR think thrice before changing these numbers.
export const WORLD_CENTER_DISTANCE = 700;

/* Pond */
export const POND_COLOR = "#42f569";
// given the x coordinate, returns the y coordinate
// for the edge of the pond in the left section.
export const leftCurve = x => {
    // TODO
    return 0;
}
// same as above, but for the center section
export const centerCurve = x => {
    // TODO
    return 0;
}
// same as above, but for the right curve
export const rightCurve = x => {
    // TODO
    return 0;
}


/* Water */
export const WATER_COLOR = "#0000ff";
export const WATER_RADIUS = 5;
export const WATER_PARTICLES = 5;
export const WATER_MASS = 5;


/* Coin */
export const DROP_POINT = { x: 300, y: 200 };
export const COIN_COLOR = "#c9b30e";
export const COIN_SIZE = { w: 15, h: 3 };
export const COIN_MASS = 100;


/* Air */
export const AIR_PARTICLES = 15;
export const AIR_MASS = 1;
export const AIR_RADIUS = 5;


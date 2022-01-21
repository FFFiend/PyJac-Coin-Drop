/* General */
// gravitational constant
export const G_CONSTANT = 0.5;
// mass of the "earth"
export const WORLD_MASS = 50000;
export const CANVAS_SIZE = { x: 600, y: 400 };
export const AIR_BOUNDARY = 275
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
   
    return 100.785 + 0.146152 * x + -0.00424588 * (x ** 2) + 0.0000781196 * (x ** 3) + -3.7185 * (10 ** -7) * (x ** 4);
}
// same as above, but for the center section
export const centerCurve = x => {
    // TODO
    return 781.4137 + -9.53355 * x + 0.046749 * (x ** 2) + -0.000102768 * (x ** 3) + 8.54967 * (10 ** -8) * (x ** 4);
}
// same as above, but for the right curve
export const rightCurve = x => {
    // TODO
    return -29673.98 + 219.219 * x + -0.60268 * (x ** 2) + 0.0007338536 * (x ** 3) + -3.341358 * (10 ** -7) * (x ** 4);
}
// constant for right end of left curve
export const POND_SECTION_A = 150
// constant for right end of middle curve
export const POND_SECTION_B = 450



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


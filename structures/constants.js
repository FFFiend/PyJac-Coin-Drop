/* General */
export const CANVAS_SIZE = { x: 600, y: 400 };


/* Pond */
export const POND_COLOR = "#42f569";
// given the x coordinate, returns the y coordinate
// for the edge of the pond in the left section.
export const leftCurve = x => {
    return 100.785 + 0.146152 * x + -0.00424588 * (x ** 2) + 0.0000781196 * (x ** 3) + -3.7185 * (10 ** -7) * (x ** 4);
};
// same as above, but for the center section
export const centerCurve = x => {
    return 781.4137 + -9.53355 * x + 0.046749 * (x ** 2) + -0.000102768 * (x ** 3) + 8.54967 * (10 ** -8) * (x ** 4);
};
// same as above, but for the right curve
export const rightCurve = x => {
    return -29673.98 + 219.219 * x + -0.60268 * (x ** 2) + 0.0007338536 * (x ** 3) + -3.341358 * (10 ** -7) * (x ** 4);
};
// constant for right end of left curve
export const POND_SECTION_A = 150;
// constant for right end of middle curve
export const POND_SECTION_B = 450;
// the "center" of the four pond quadrants for water particles
export const POND_QUAD_CENTER = { x: CANVAS_SIZE.x/2, y: CANVAS_SIZE.y*13/16 };


/* Water */
export const WATER_COLOR = "#0000ff";
export const WATER_RADIUS = 5;
export const WATER_PARTICLES = 20;
export const WATER_MASS = 50;
export const WATER_REF_DENSITY = 1;
export const BULK_MODULUS = 3;
export const VISCOSITY = 1;


/* Coin */
export const DROP_POINT = { x: 300, y: 200 };
export const COIN_COLOR = "#c9b30e";
export const COIN_SIZE = { w: 15, h: 3 };
export const COIN_MASS = 100;


/* Air */
export const AIR_PARTICLES = 15;
export const AIR_MASS = 1;
export const AIR_RADIUS = 5;
export const AIR_BOUNDARY = 275


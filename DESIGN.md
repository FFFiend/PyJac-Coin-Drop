> The original document is [here](https://gist.github.com/quintik/b989a55fb62c22668d89d696d3d87382), where you can find the ProcessingJS scripts that it refers to.

# Simulating a coin drop in a pond

There's three parts to it: the water, the coin, and the air. The goal is to program them **individually** such that when we put all of them together, the interactions between them play out on their own, mimicking real life as closely as possible (as opposed to us hardcoding specific scenarios):

## Water

We will do this using [smoothed-particle hydrodynamics](https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics). The idea is to simulate water with lots of really small particles. We control properties of the particles such as elasticity, collision softness, viscosity etc. to try and simulate the behaviour of liquids in real life as closely as possible. Ideally, we would want to have as few of these variables as possible to reduce complexity in our program.

To get started, I found some very useful resources on KhanAcademy's [Pixar in a Box](https://www.khanacademy.org/computing/pixar) course, under the [Effects](https://www.khanacademy.org/computing/pixar/effects) unit which goes through this very process of simulating water with particles.

The course also included basic simulations using ProcessingJS, two of which I've attached to this gist below (`water-particles.js`, `water-sph.js`). Credit goes to [Peter Collingridge](https://www.khanacademy.org/profile/peterwcollingridge) for both scripts.

The first script, `water-particles.js` is a more simplistic simulation of liquids based just on a system of small particles, where we control only their elasticity. You can view the original simulation [here on KhanAcademy](https://www.khanacademy.org/computer-programming/water-simulation/5127221893791744). Notice that with smaller particles it comes close to simulating liquids but not quite. For example, the particles sort of stack on top of each other in the middle, like sand rather than liquid.

The second script, `water-sph.js` allows us to manipulate the viscosity and collision softness for particles. View the original simulation [here](https://www.khanacademy.org/computer-programming/smoothed-particle-hydrodynamics/5056836848). This allows us to more closely mimic the behaviour of water and other fluids as well (e.g honey which has a high viscosity), though of course for this project we only care about water.

#### `Other notes`

For the water particles we could experiment with their shape a little bit. With round particles, if large enough there will be space between them showing, which would make it look less realistic. Instead, we could use shapes like triangles that would tessellate more easily. Example: https://google.github.io/liquidfun/.

For debugging purposes, allow a toggle for coloring the border of each particle so we can see them individually more easily. Also, allow manipulating properties like viscosity, elasticity, etc., and a "reset" button to reset them to the defaults.

## Coin

I was able to find this excellent book by Daniel Shiffman, the Nature of Code, which talks about simulating natural phenomena. It's available online, and [Chapter 4](https://natureofcode.com/book/chapter-4-particle-systems/) goes through particle systems specifically. Section 4.12 describes a repeller object which essentially pushes incoming particles away from it. There is an animation available on the website which you can run right in the browser. In it, the particles are falling on top of the repeller and getting, well, repelled away. However, we can also think of it as the *repeller* falling onto the particles (i.e turning the animation upside down). If we look at it that way, with the repeller as our coin and the particles as the water, we can see it as the coin sinking through water.

(We would still need to test this but) The interesting bit here is that this is not exactly a "hack" to make things work - when the coin is falling down, its net force vector is also pointing down, that is, *it already acts as a repeller object*. When it is submerged in the water, it still has a downwards net force because its density is greater, so it would continue to push on particles under it. This *should* help it sink downwards. The hacky thing we might need to do is add some more repelling force to it, or add some repel to it's sides as well for it to be able to sink more easily.

As a benchmark for how "realistic" our simulation is, we can use this paper: coin falling in water and compare the coin's trajectory as it falls to those shown in the paper for specific angles of the coin when it falls.

#### `Other notes`

-/-

## Air

For now, we will be simplifying things by disregarding air and only having the coin fall perfectly horizontally.

Eventually, we could allow changing the angle of the coin when it's drop, or it's initial velocity and such. Furthermore, to include "randomness" (since coin drops aren't deterministic!) we could add particles to simulate air - the Nature of Code book has examples of objects randomly floating around, and we'd be using the same idea for air particles. These would have high velocity and random motion, and with enough of them we will have some hitting the coin, applying force on it (we will make these collisions perfectly elastic so the air particles still keeps floating around instead of falling), and altering its trajectory. 

#### `Other notes`

-/-

## Development

Repository: https://github.com/FFFiend/PyJac-Coin-Drop

The project will be built with web technologies, so we'll be using TypeScript/HTML/CSS. We'll be using the [p5js](https://p5js.org/) library for the simulation, which will also do much of the work of a physics engine (mainly with handling collisions). We likely won't be needing a web server since we don't really need to load any other files or assets.

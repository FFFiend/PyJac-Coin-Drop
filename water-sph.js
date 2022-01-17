// Implementation of sph as described in
//    Muller, et al, Particle-based fluid simulation
// Adapted for 2D in
//    http://www.cs.cornell.edu/~bindel/class/cs5220-f11/code/sph.pdf

// Number of particles
var N = 400;
var x, y, vx, vy, vhx, vhy, ax, ay, rho;

var h = 0.016;          // Particle radius
var h2 = h * h;         // Radius squared
var h4 = h2 * h2;       // Radius to the 4
var h8 = h4 * h4;       // Radius to the 8

// Resistance to compression
// speed of sound = sqrt(k / rho0)
var k = 30;                    // Bulk modulus (1000)

var gravity = -9.8;             // Gravity
var mu = 3;                     // Viscosity (0.1)
var rho0 = 1000;                // Reference density
var rho02 = rho0 * 2;           
var dt = 18e-4;                  // Time step in seconds
var dt2 = dt / 2;               // Half time step in seconds
var restitution = 0.95;         // Coefficient of restituion for boundary

var Cp =  15 * k;
var Cv = -40 * mu;
var C0, C1, C2;

var minCol = color(255, 255, 255);
var maxCol = color(0, 0, 200);

var minCol = color(180, 220, 250);
var maxCol = color(0, 0, 150);

var edge1 = h * 0.5;
var edge2 = 1 - edge1;
var edge3 = height / width - edge1;

var mass;
var _scale = width;
var diameter = h * _scale * 0.85;
var i, j;

// GUI
{
var sansFont = createFont("sans", 15);
/*******************************************************
 * Generic GUI component from which other elements inherit
 * The default object is basically a button
********************************************************/
{
var GUI_Component = function(x, y, w, h, name, updateFunction) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;
    
    if (updateFunction) {
        this.trigger = updateFunction.bind(this);
    }
    
    this.selected = false;
    this.disabled = false;
    this.transition = 0;
};

GUI_Component.prototype.draw = function() {
    if (this.mouseOver()) {
        fill(100);
    } else {
        fill(200);
    }
    
    noStroke();
    rect(this.x, this.y, this.w, this.h, 12);
    
    fill(20);
    textFont(sansFont, 15);
    textAlign(CENTER, CENTER);
    text(this.name, this.x + this.w / 2, this.y + this.h/2 + 1);
};

GUI_Component.prototype.mouseOver = function() {
    return (mouseX >= this.x && mouseX <= this.x + this.w &&
            mouseY >= this.y && mouseY <= this.y + this.h);
};

GUI_Component.prototype.mousePressed = function() {
    this.selected = this.mouseOver();
};

GUI_Component.prototype.mouseDragged = function() {};

GUI_Component.prototype.mouseReleased = function() {
    if (this.selected && !this.disabled && this.mouseOver()) {
        this.trigger();
    }
    this.selected = false;
};

GUI_Component.prototype.trigger = function() {
    // To be over-written
};

GUI_Component.prototype.fade = function() {
    if (this.selected || this.mouseOver()) {
        this.transition = min(10, this.transition + 1);
    } else {
        this.transition = max(0, this.transition - 1);
    }
};
}
/*******************************************************
 *      GUI Button
********************************************************/
{
var Button = function(x, y, w, h, params) {
    GUI_Component.call(this, x, y, w, h, params.name, params.trigger);
    this.defaultCol = color(230, 230, 230, 200);
    this.highlightCol = params.highlightCol || color(210, 210, 210, 250);
    if (params.filled) {
        this.makeFilled();
    }
};
Button.prototype = Object.create(GUI_Component.prototype);

Button.prototype.draw = function() {
    this.fade();
    
    if (this.disabled) {
        fill(180);
        noStroke();
    } else {
        fill(lerpColor(this.defaultCol, this.highlightCol, this.transition / 10));
        strokeWeight(1);
        stroke(200);
    }
    
    rect(this.x, this.y - 1, this.w, this.h + 3, 12);
    
    if (this.disabled) {
        fill(120);
    } else {
        fill(20);
    }
    
    textFont(sansFont, 15);
    textAlign(CENTER, CENTER);
    text(this.name, this.x + this.w / 2, this.y + this.h/2 + 1);
};

Button.prototype.drawFilled = function() {
    this.fade();
    
    if (this.disabled) {
        fill(180);
        noStroke();
    } else {
        fill(lerpColor(this.defaultCol, this.highlightCol, this.transition / 10));
        strokeWeight(1);
        stroke(this.highlightCol);
    }
    
    rect(this.x, this.y - 1, this.w, this.h + 3, 19);
    
    if (this.disabled) {
        fill(120);
    } else {
        fill(lerpColor(this.highlightCol, color(255, 255, 255), this.transition / 10));
    }
    
    textFont(sansFont, 16);
    textAlign(CENTER, CENTER);
    text(this.name, this.x + this.w / 2, this.y + this.h/2);
};

Button.prototype.makeFilled = function() {
    this.draw = this.drawFilled;
    this.defaultCol = color(0, 0, 0, 1);
};
}
/*******************************************************
 *      GUI Slider
********************************************************/
{
var Slider = function(x, y, w, h, params) {
    // Size of ball
    this.ballR = params.ballR || h / 2;
    this.ballD = this.ballR * 2;
    
    x += this.ballR;
    w -= this.ballR * 2;
    
    var h = this.ballD + (params.name ? 16 : 0);
    y += h - this.ballR;
    
    GUI_Component.call(this, x, y, w, h, params.name, params.trigger);
    
    this.x2 = x + w;
    this.fill = params.fill || color(240);
    this.stroke = params.stroke || color(180);
    
    this.min = params.min || 0;
    this.max = params.max === undefined ? 1 : params.max;
    this.val = params.now === undefined ? this.min : params.now;
    this.decimalPlaces = params.decimalPlaces === undefined ? 0 : params.decimalPlaces;
    this.jumpSize = params.jumpSize || pow(10, this.decimalPlaces);
    this.setValue(this.val);
    this.trigger();
};
Slider.prototype = Object.create(GUI_Component.prototype);

Slider.prototype.draw = function() {
    if (this.name) {
        fill(20);
        textSize(13);
        textAlign(CENTER, BASELINE);
        text(this.name,  this.x + this.w / 2, this.y - 15);
    }
    
    this.fade();
    fill(lerpColor(color(this.fill), color(this.stroke), this.transition / 10));
    stroke(this.stroke);
    strokeWeight(3);
    line(this.x, this.y, this.x2, this.y);
    ellipse(this.bx, this.y, this.ballD, this.ballD);
    
    fill(20);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("" + this.val, this.bx, this.y);
};

Slider.prototype.mouseOver = function() {
    return dist(mouseX, mouseY, this.bx, this.y) < this.ballR;
};

Slider.prototype.mousePressed = function() {
    if (this.mouseOver()) {
        this.selected = true;
        return true;
    }
};

Slider.prototype.mouseDragged = function() {
    if (this.selected) {
        this.bx = constrain(mouseX, this.x, this.x2);
        var p = this.jumpSize;
        this.val = round(map(this.bx, this.x, this.x2, this.min, this.max) * p) / p;
        this.trigger();
        return true;
    }
};

Slider.prototype.setValue = function(v) {
    this.val = constrain(v, this.min, this.max);
    this.bx = map(this.val, this.min, this.max, this.x, this.x2);
    this.trigger();
};
}
/*******************************************************
 *      Toolbar
 *  Like GUI but is displayed and has methods for adding
 * components like buttons and sliders.
********************************************************/
{
var Toolbar = function(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 8;
    
    this.components = [];
};

Toolbar.prototype.draw = function() {
    noStroke();
    fill(255, 255, 255, 240);
    rect(this.x, this.y, this.w, this.h, 8);
    for (var i = 0; i < this.components.length; i++) {
        this.components[i].draw();
    }
};

Toolbar.prototype.add = function(type, params) {
    params = params || {};
    var h = params.h || 20;
    var component = new type(this.x + 5, this.y + this.h, this.w - 10, h, params);
    this.components.push(component);
    this.h += component.h + 8;
};


Toolbar.prototype.mousePressed = function() {
    for (var i = 0; i < this.components.length; i++) {
        this.components[i].mousePressed();
    }
};

Toolbar.prototype.mouseReleased = function() {
    for (var i = 0; i < this.components.length; i++) {
        this.components[i].mouseReleased();
    }
};

Toolbar.prototype.mouseDragged = function() {
    for (var i = 0; i < this.components.length; i++) {
        this.components[i].mouseDragged();
    }
};
}
}

/**************************************
 *      Set-up GUI
***************************************/

var initialiseArrays = function() {
    x = new Array(N);       // Positions
    y = new Array(N);
    vx = new Array(N);      // Velocities
    vy = new Array(N);
    vhx = new Array(N);     // Half step velocities
    vhy = new Array(N);
    ax = new Array(N);      // Accelerations
    ay = new Array(N);
    rho = new Array(N);     // Densities
};

var randomInit = function() {
    for (i = N; i--;) {
        // Initialize particle positions
        x[i] = random(h, 0.25);
        y[i] = random(0.5, 0.95);
        
        // Initialize particle velocities
        vx[i] = random(-0.02, 0.02);
        vy[i] = random(-0.02, 0.02);
    }
};

var particlesInMesh = function(y1, y2) {
    var xp = h * 0.5 + 0.01;
    var yp = y1;
    var r = h;
    
    for (i = 0; i < N; i++) {
        // Initialize particle positions
        x[i] = xp;
        y[i] = yp;
        yp += r;
        
        if (yp > y2) {
            yp = y1;
            xp += r;
        }
        
        // Initialize particle velocities
        vx[i] = random(-0.02, 0.02);
        vy[i] = random(-0.02, 0.02);
    }
};

var computeDensities = function() {
    // Find new densities
    var dx, dy, r2, z, rho_ij;
    var C1 = 4 * mass / (PI * h2);
    var C2 = 4 * mass / (PI * h8);

    // Initialise densities
    for (i = N; i--;) {
        rho[i] = C1;
    }

    for (i = 0; i < N; i++) {
        for (j = i + 1; j < N; j++) {
            dx = x[i] - x[j];
            dy = y[i] - y[j];
            r2 = dx * dx + dy * dy;
            z  = h2 - r2;
            
            if (z > 0) {
                rho_ij = C2 * z * z * z;
                rho[i] += rho_ij;
                rho[j] += rho_ij;
            }
        }
    }

};

var computeAccelerations = function() {
    computeDensities();
    
    // Start with gravity and surface forces
    for (i = N; i--;) {
        ax[i] = 0;
        ay[i] = -gravity;
    }
    
    // Find new densities
    var dx, dy, r2, rhoi, rhoj, q, u, w0, wp, wv, dvx, dvy;
    
    for (i = N; i--;) {
        rhoi = rho[i];
        
        for (j = i; j--;) {
            dx = x[i] - x[j];
            dy = y[i] - y[j];
            r2 = dx * dx + dy * dy;
            
            if (r2 < h2) {
                rhoj = rho[j];
                q = sqrt(r2) / h;
                u = 1 - q;
                w0 = C0 * u / (rhoi * rhoj);
                wp = w0 * Cp * (rhoi + rhoj - rho02) * u / q;
                wv = w0 * Cv;
                
                dvx = vx[i] - vx[j];
                dvy = vy[i] - vy[j];
                
                ax[i] += wp * dx + wv * dvx;
                ay[i] += wp * dy + wv * dvy;
                ax[j] -= wp * dx + wv * dvx;
                ay[j] -= wp * dy + wv * dvy;
            }
        }
    }
    
};

var updateParticles = function() {
    var collisions = [];
    var dx, dy, r2;
    
    // Reset properties and find collisions
    for (i = N; i--;) {
        // Reset density
        rho[i] = C1;
        
        // Reset acceleration
        ax[i] = 0;
        ay[i] = -gravity;
        
        // Calculate which particles overlap
        for (j = i; j--;) {
            dx = x[i] - x[j];
            dy = y[i] - y[j];
            r2 = dx * dx + dy * dy;
            if (r2 < h2) {
                collisions.push([i, j, dx, dy, r2]);
            }
        }
    }
    
    // Calculate densities
    var c, rho_ij, z;
    for (i = collisions.length; i--;) {
        c = collisions[i];
        z = h2 - c[4];
        rho_ij = C2 * z * z * z;
        rho[c[0]] += rho_ij;
        rho[c[1]] += rho_ij;
    }
    
    // TODO: Find max density
    
    // Calculate accelerations

    var pi, pj, q, u, w0, wp, wv, dvx, dvy;
    for (i = collisions.length; i--;) {
        c = collisions[i];
        pi = c[0];
        pj = c[1];

        q = sqrt(c[4]) / h;
        u = 1 - q;
        w0 = C0 * u / (rho[pi] * rho[pj]);
        wp = w0 * Cp * (rho[pi] + rho[pj] - rho02) * u / q;
        wv = w0 * Cv;
        
        dvx = vx[pi] - vx[pj];
        dvy = vy[pi] - vy[pj];
        
        ax[pi] += wp * c[2] + wv * dvx;
        ay[pi] += wp * c[3] + wv * dvy;
        ax[pj] -= wp * c[2] + wv * dvx;
        ay[pj] -= wp * c[3] + wv * dvy;
    }

};

var normalizeMass = function() {
    mass = 1;
    computeDensities();
    
    var rho2s = 0;
    var rhos  = 0;
    for (i = N; i--;) {
        rho2s += rho[i] * rho[i];
        rhos  += rho[i];
    }
    
    mass = rho0 * rhos / rho2s;
    // Constants for interaction term
    C0 = mass / (PI * h4);
    C1 = 4 * mass / (PI * h2);
    C2 = 4 * mass / (PI * h8);
};

var leapfrogInit = function() {
    for (i = N; i--;) {
        // Update half step velocity
        vhx[i] = vx[i] + ax[i] * dt2;
        vhy[i] = vy[i] + ay[i] * dt2;
        
        // Update velocity
        vx[i] = ax[i] * dt2;
        vy[i] = ay[i] * dt2;
        
        // Update position
        x[i] += vhx[i] * dt;
        y[i] += vhy[i] * dt;
    }
};

var leapfrogStep = function() {
    for (i = N; i--;) {
        // Update half step velocity
        vhx[i] += ax[i] * dt;
        vhy[i] += ay[i] * dt;
        
        // Update velocity
        vx[i] = vhx[i] + ax[i] * dt2;
        vy[i] = vhy[i] + ay[i] * dt2;
        
        // Update position
        x[i] += vhx[i] * dt;
        y[i] += vhy[i] * dt;
        
        // Handle boundaries
        if (x[i] < edge1) {
            x[i] = edge1;// + random(0.0001, 0.0005);
            vx[i] *= -restitution;
            vhx[i] *= -restitution;
        } else if (x[i] > edge2) {
            x[i] = edge2;// - random(0.0001, 0.0005);
            vx[i] *= -restitution;
            vhx[i] *= -restitution;
        }
        
        /*if (y[i] < edge1) {
            y[i] = edge1 + random(0.0001, 0.0005);
            vy[i] *= -restitution;
            vhy[i] *= -restitution;
        } else */if (y[i] > edge3) {
            y[i] = edge3 - random(0.0001, 0.0005);
            vy[i] *= -restitution;
            vhy[i] *= -restitution;
        }
    }
};

var update = function() {
    //computeAccelerations();
    updateParticles();
    leapfrogStep();
};

var initialiseSystem = function() {
    initialiseArrays();
    
    particlesInMesh(0.05, height / width - 0.01);

    normalizeMass();
    computeAccelerations();
    leapfrogInit();
};

/**************************************
 *      Set-up system
***************************************/

initialiseSystem();

/**************************************
 *      Set-up GUI
***************************************/

var toolbar = new Toolbar(5, 5, 128);
toolbar.add(Slider, {
    name: "Number of particles",
    min: 100,
    now: 200,
    max: 800,
    trigger: function() {
        N = this.val;
        initialiseArrays();
        initialiseSystem();
    }
});
toolbar.add(Slider, {
    name: "Viscosity",
    min: 0.5,
    now: 3,
    max: 20,
    decimalPlaces: 1,
    trigger: function() {
        Cv = -40 * this.val;
        dt = min(0.003, 0.05 / sqrt(-Cp * Cv));
    }
});
toolbar.add(Slider, {
    name: "Collision softness",
    min: 1,
    now: 60,
    max: 100,
    trigger: function() {
        var v = 101 - this.val;
        Cp =  15 * v;
        dt = min(0.003, 0.05 / sqrt(-Cp * Cv));
    }
});
/*
toolbar.add(Slider, {
    name: "Particle size",
    min: 1,
    now: 5,
    max: 10,
    trigger: function() {
        Cp =  15 * this.val;
        dt = min(0.003, 0.01 / sqrt(this.val));
    }
});
*/

toolbar.add(Button, {
    name: "Restart",
    trigger: initialiseSystem
});

/**************************************
 *      Main loop
***************************************/

draw = function() {
    background(0);
  
    var m = millis();
  
    // Find maxRho
    var maxRho = max.apply(null, rho);
  
    // Draw particles
    strokeWeight(diameter);
    for (var i = N; i--;) {
        stroke(lerpColor(minCol, maxCol, (rho[i] - rho0) / maxRho));
        point(_scale * x[i], _scale * y[i]);
    }
    
    var count = 0;
    var MAX_COUNT = 30;
    while (count < MAX_COUNT && millis() - m < 40) {
        update();
        count++;
    }
    //println(count);
    
    toolbar.draw();
    
    textAlign(RIGHT, TOP);
    fill(255);
    //text(count + " updates took " + (millis() - m) + " ms", width - 8, 5);
};

/**************************************
 *      Event handling
***************************************/

mousePressed = function() {
    toolbar.mousePressed();
};

mouseDragged = function() {
    toolbar.mouseDragged();
};

mouseReleased = function() {
    toolbar.mouseReleased();
};

mouseOut = mouseReleased;


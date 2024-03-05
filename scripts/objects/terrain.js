// --------------------------------------------------------------
//
// Creates a Terrain object, with functions for managing state.
//
// spec = {
//    color: "",
//    iterations: int,          // number of times to recurse
//    s: int,                   // surface-roughness factor
//    rg: int,                  // Gaussian random number
//    safeZoneDistance: int,    // how long the safe zone is
//    canvasHeight: int,
//    canvasWidth: int,
//    lst: []
// }
//
// --------------------------------------------------------------
MyGame.objects.terrain = function(spec) {
    'use strict';

    // NOT MY OWN CODE!!
    // CREDIT: https://www.30secondsofcode.org/js/s/random-gauss/
    const randomGauss = () => {
        const theta = 2 * Math.PI * Math.random();
        const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
        return (rho * Math.cos(theta)) / 10.0 + 0.5;
    };

    let rg = randomGauss();
    // console.log("rg: ", rg);

    // create lst
    // calculate how many points will be in the line:
    let numPoints = Math.pow(2, spec.iterations) + 1;
    // console.log("numPoints: ", numPoints);
    let lst = new Array(numPoints);
    // console.log("fresh length: ", lst.length);

    // add endpoints, randomly choose their elevations:
    let startY = Math.floor(Math.random() * spec.canvasHeight);
    let endY = Math.floor(Math.random() * spec.canvasHeight);
    lst[0] = startY;
    lst[lst.length - 1] = endY;
    
    // add the safe zones
    let safeZoneStartX = Math.floor(Math.random() * lst.length);
    // ENSURE THE SAFE ZONE IS AT LEAST 15% AWAY FROM THE BORDERS
    if ((safeZoneStartX + spec.safeZoneDistance) < ((lst.length - 1) * .15)) {
        safeZoneStartX += Math.floor(lst.length * .15);
    } else if ((safeZoneStartX + spec.safeZoneDistance) > (lst.length - 1) + ((lst.length - 1) * .15)) {
        safeZoneStartX -= Math.floor(lst.length * .15);
    }

    let safeZoneStartY = Math.floor(Math.random() * spec.canvasHeight);
    for (let i = safeZoneStartX; i < safeZoneStartX + spec.safeZoneDistance; i++) {
        lst[i] = safeZoneStartY;
    }
    console.log("safeZoneStartX: ", safeZoneStartX);
    console.log("safeZoneStartY: ", safeZoneStartY);

    let middleIndex = Math.floor(lst.length / 2);
    console.log("list.length: ", lst.length);
    console.log("middleIndex: ", middleIndex);
    generateTerrain(middleIndex, spec.iterations, lst);

    // TODO: BE SURE YOU'RE DOING RG CORRECTLY :)))
    // TODO: CONSIDER CHANGING THE VALUE OF S AT EACH LEVEL OF REFINEMENT
    function computeElevation(ax, bx, ay, by, s, rg) {
        console.log(ax, bx, ay, by, s, rg);
        let r = s * rg * Math.abs(bx - ax);
        let midpoint = .5 * (ay + by) + r;
        // console.log("midpoint: ", midpoint);
        return midpoint;
    }

    function generateTerrain(idx, iterations, lst) {
        // only fill spot with a value if it's empty; this way the safe zones remain untouched
        if (lst[idx] === undefined) {
            // let ax = idx - Math.pow(2, iterations - 2);
            // let bx = idx + Math.pow(2, iterations - 2);
            console.log("iterations: ", iterations);
            console.log("idx: ", idx);
            let ax = idx - Math.pow(2, iterations - 1);
            let ay = lst[ax];
            let bx = idx + Math.pow(2, iterations - 1);
            let by = lst[bx];
            lst[idx] = computeElevation(ax, bx, ay, by, spec.s, rg); // TODO: THIS MIGHT NEED THE ACTUAL X VALUE, NOT JUST THE INDEX!!
        }
        if (iterations - 1 > 0) {
            let lowerHalfIdx = idx - Math.pow(2, iterations - 2);
            let upperHalfIdx = idx + Math.pow(2, iterations - 2);
            // spec.s += 1;
            generateTerrain(lowerHalfIdx, iterations - 1, lst);
            generateTerrain(upperHalfIdx, iterations - 1, lst);
        }

        console.log("finished lst is: ", lst);
    }
    
    // INSERT THOSE INTO LIST SOMEHOW?? 
        // AND THEN CHECK WHEN RECURSING TO BE SURE THAT THE LIST THERE ISN'T ALREADY FULL
        // HAVE A DIFFERENT CHECK TO MAKE SURE YOU HAVEN'T RECURSED TOO MANY TIMES


    let api = {
        rg: rg,
        lst: lst,
        get color() { return spec.color; },
        get iterations() { return spec.iterations; },
        get s() { return spec.s; },
        // get rg() { return spec.rg; },
        get safeZoneDistance() { return spec.safeZoneDistance; },
        get canvasHeight() { return spec.canvasHeight; },
        get canvasWidth() { return spec.canvasWidth; },
        // get lst() { return spec.lst; }
    };

    return api;
}

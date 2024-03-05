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
    // const randomGauss = () => {
    //     const theta = 2 * Math.PI * Math.random();
    //     const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
    //     return (rho * Math.cos(theta)) / 10.0 + 0.5;
    // };

    function addEndpoints(lst) {
        // add endpoints, randomly choose their elevations:
        let startY = Math.floor(Math.random() * spec.canvasHeight / 2) + (spec.canvasHeight * .4);
        let endY = Math.floor(Math.random() * spec.canvasHeight / 2) + (spec.canvasHeight * .4);
        lst[0] = startY;
        lst[lst.length - 1] = endY;
    }

    function addSafeZone(lst) {
        let safeZoneStartX = Math.floor(Math.random() * lst.length);
        
        // ENSURE THE SAFE ZONE IS AT LEAST 15% AWAY FROM THE BORDERS
        if ((safeZoneStartX + spec.safeZoneDistance) < ((lst.length - 1) * .15)) {
            safeZoneStartX += Math.floor(lst.length * .15);
        } 
        else if ((safeZoneStartX + spec.safeZoneDistance) > (lst.length - 1) + ((lst.length - 1) * .15)) {
            safeZoneStartX -= Math.floor(lst.length * .15);
        }
    
        // ensure the height of the safe zone isn't more than a little over halfway up the screen
        let safeZoneStartY = Math.floor(Math.random() * (spec.canvasHeight / 2)) + (spec.canvasHeight * .4);
        
        // put the safe zone in the list
        for (let i = safeZoneStartX; i < safeZoneStartX + spec.safeZoneDistance; i++) {
            lst[i] = safeZoneStartY;
        }
    }

    // TODO: BE SURE YOU'RE DOING RG CORRECTLY :)))
    // TODO: CONSIDER CHANGING THE VALUE OF S AT EACH LEVEL OF REFINEMENT
    function computeElevation(ax, bx, ay, by, s, rg) {
        // console.log("numbers for computeElevation are: ", ax, bx, ay, by, s, rg);
        let r = s * rg * (bx - ax);
        let midpoint = .5 * (ay + by) + r;
        if (midpoint < 0) {
            // console.log("midpoint was less than 0...", midpoint);
            midpoint = 20;
        } else if (midpoint > spec.canvasHeight) {
            // console.log("midpoint was greater than canvasHeight...", midpoint, " ,", spec.canvasHeight);
            midpoint = spec.canvasHeight;
        }
        // console.log("midpoint: ", midpoint);
        return midpoint;
    }

    function generateTerrain(rg, idx, iterations, lst) {
        // only fill spot with a value if it's empty; this way the safe zones remain untouched
        if (lst[idx] === undefined) {
            // let ax = idx - Math.pow(2, iterations - 2);
            // let bx = idx + Math.pow(2, iterations - 2);
            let ax = idx - Math.pow(2, iterations - 1);
            let ay = lst[ax];
            let bx = idx + Math.pow(2, iterations - 1);
            let by = lst[bx];
            lst[idx] = computeElevation(ax, bx, ay, by, spec.s, rg); // TODO: THIS MIGHT NEED THE ACTUAL X VALUE, NOT JUST THE INDEX!!
            // console.log("ax, ay is: ", ax, ay);
            // console.log("bx, by is: ", bx, by);            
            // console.log("lst[idx] is: ", lst[idx]);
        }
        if (iterations - 1 > 0) {
            let lowerHalfIdx = idx - Math.pow(2, iterations - 2);
            let upperHalfIdx = idx + Math.pow(2, iterations - 2);
            // spec.s += 1;
            generateTerrain(rg, lowerHalfIdx, iterations - 1, lst);
            generateTerrain(rg, upperHalfIdx, iterations - 1, lst);
        }
    }


    function initializeList(rg) {

        // calculate how many points will be in the line:
        let numPoints = Math.pow(2, spec.iterations) + 1;
        let lst = new Array(numPoints);

        addEndpoints(lst);
        // addSafeZone(lst);

        let middleIndex = Math.floor(lst.length / 2);
        console.log("starting list: ", lst);
    
        generateTerrain(rg, middleIndex, spec.iterations, lst);

        return lst;
    }



    function generateGaussianRandom() {
        let u1, u2;
        let z0, z1;
        
        do {
            u1 = Math.random();
            u2 = Math.random();
        } while (u1 <= Number.EPSILON); // Make sure u1 is not zero to avoid log(0)
        
        z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
        
        // z0 and z1 are two independent standard normal random variables
        // We can use one of them as the Gaussian random number with mean 0 and variance 1
        return z0;
    }
                  

    // function testGaussianRandom(num) {
    //     for (let i = 0; i < num; i++) {
    //         // let nextGauss = generateGaussianRandom();
    //         console.log(generateGaussianRandom());
    //     }
    // }

    // testGaussianRandom(20);
    
    let rg = generateGaussianRandom();
    let lst = initializeList(rg);

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

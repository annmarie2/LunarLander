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

    // create lst
    // calculate how many points will be in the line:
    let numPoints = Math.pow(2, spec.iterations) + 1;
    let lst = new Array(numPoints);

    // add endpoints, randomly choose their elevations:
    let startY = Math.floor(Math.random() * spec.canvasHeight);
    let endY = Math.floor(Math.random() * spec.canvasHeight);
    
    // add the safe zones
    let safeZoneStartX = Math.floor(Math.random() * lst.length);
    let safeZoneStartY = Math.floor(Math.random() * spec.canvasHeight);
    // TODO: GET ENDPOINTS FOR SAFE ZONES,
    for (let i = safeZoneStartX; i < safeZoneStartX + spec.safeZoneDistance; i++) {
        lst[i] = endY;
    }
    console.log("We've inserted the safeZone now: ", lst);
    // INSERT THOSE INTO LIST SOMEHOW?? 
        // AND THEN CHECK WHEN RECURSING TO BE SURE THAT THE LIST THERE ISN'T ALREADY FULL
        // HAVE A DIFFERENT CHECK TO MAKE SURE YOU HAVEN'T RECURSED TOO MANY TIMES


    let api = {
        get color() { return spec.color; },
        get iterations() { return spec.iterations; },
        get s() { return spec.s; },
        get rg() { return spec.rg; },
        get safeZoneDistance() { return spec.safeZoneDistance; },
        get canvasHeight() { return spec.canvasHeight; },
        get canvasWidth() { return spec.canvasWidth; },
        get lst() { return spec.lst; }
    };

    return api;
}

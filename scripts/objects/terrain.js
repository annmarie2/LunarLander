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
//    startHeight: int,         // y value for starting point
//    lst: []
// }
//
// --------------------------------------------------------------
MyGame.objects.terrain = function(spec) {
    'use strict';

    // create lst
    let lst = [];
    // fill lst recursively :))

    let api = {
        get color() { return spec.color; },
        get iterations() { return spec.iterations; },
        get s() { return spec.s; },
        get rg() { return spec.rg; },
        get safeZoneDistance() { return spec.safeZoneDistance; },
        // get startHeight() { return spec.startHeight; },
        get lst() { return spec.lst; }
    };

    return api;
}

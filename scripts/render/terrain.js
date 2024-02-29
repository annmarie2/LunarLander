// --------------------------------------------------------------
//
// Renders a Terrain object.
//
// spec = {
//    color: "",
//    iterations: int,          // number of times to recurse
//    s: int,                   // surface-roughness factor
//    rg: int,                  // Gaussian random number
//    safeZoneDistance: int,    // how long the safe zone is
//    startHeight: int,         // y value for starting point
//    segmentWidth: int,        // how wide each segment in the terrain is
//    lst: []
// }
//
// --------------------------------------------------------------
MyGame.render.Terrain = (function(graphics) {
    'use strict';

    function render(spec) {
        graphics.drawTerrain(spec.startHeight, spec.color, spec.iterations, spec.lst);
    }

    return {
        render: render
    };
}(MyGame.graphics));

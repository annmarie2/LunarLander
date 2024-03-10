// --------------------------------------------------------------
//
// Renders a Terrain object.
//
// spec = {
//    iterations: int,          // number of times to recurse
//    s: int,                   // surface-roughness factor
//    safeZoneDistance: int,    // how long the safe zone is
//    canvasHeight: int,
//    canvasWidth: int,
//    lst: []
// }
//
// --------------------------------------------------------------
MyGame.render.Terrain = (function(graphics) {
    'use strict';

    function render(spec) {
        graphics.drawTerrain(spec.lst);
    }

    return {
        render: render
    };
}(MyGame.graphics));

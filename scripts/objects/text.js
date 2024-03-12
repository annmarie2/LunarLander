// --------------------------------------------------------------
//
// Creates a Text object, with functions for managing state.
//
// spec = {
//    text: ,
//    font: ,
//    fillStyle: ,
//    strokeStyle: ,
//    position: { x: , y: }
// }
//
// --------------------------------------------------------------
MyGame.objects.Text = function(spec) {
    'use strict';

    let rotation = 0;

    function update(fuelCount) {
        if (fuelCount > 0) {
            spec.text = "fuel: " + fuelCount.toFixed(2);
        }
        else {
            spec.text = "fuel: 0.00";
            spec.fillStyle = 'rgba(255, 255, 255, 1)';
        }
    }

    let api = {
        update: update,
        get rotation() { return rotation; },
        get position() { return spec.position; },
        get text() { return spec.text; },
        get font() { return spec.font; },
        get fillStyle() { return spec.fillStyle; },
        get strokeStyle() { return spec.strokeStyle; }
    };

    return api;
}

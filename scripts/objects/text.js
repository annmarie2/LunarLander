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

    function updateFuel(fuelCount) {
        if (fuelCount > 0) {
            spec.text = "fuel: " + fuelCount.toFixed(2);
        }
        else {
            spec.text = "fuel: 0.00";
            spec.fillStyle = 'rgba(255, 255, 255, 1)';
        }
    }

    function updateVerticalSpeed(vertSpeed) {
        if (vertSpeed > 2) {
            spec.text = "vertical speed: " + vertSpeed.toFixed(2) + " m/s";
            spec.fillStyle = 'rgba(255, 255, 255, 1)';
        } else {
            spec.text = "vertical speed: " + vertSpeed.toFixed(2) + " m/s";
            spec.fillStyle = 'rgba(0, 255, 0, 1)';
        }
    }

    let api = {
        updateFuel: updateFuel,
        updateVerticalSpeed: updateVerticalSpeed,
        get rotation() { return rotation; },
        get position() { return spec.position; },
        get text() { return spec.text; },
        get font() { return spec.font; },
        get fillStyle() { return spec.fillStyle; },
        get strokeStyle() { return spec.strokeStyle; }
    };

    return api;
}

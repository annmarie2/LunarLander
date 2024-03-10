// --------------------------------------------------------------
//
// Creates a Logo object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    center: { x: , y: },
//    size: { width: , height: },
//    gravity: ,
//    momentum: ,
// }
//
// --------------------------------------------------------------
MyGame.objects.Lander = function(spec) {
    'use strict';

    let rotation = 90 * Math.PI / 180; // start the lander on its side
    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function updateRotation(howMuch) {
        rotation += howMuch;
    }

    // yeh??
    function updateCenter(x, y) {
        center.x += x;
        center.y += y;
    }

    function turnLeft(elapsedTime) {
        rotation -= (Math.PI / 800) * elapsedTime;  // 800 because that's a good arbitrary number for slow turns
    }

    function turnRight(elapsedTime) {
        rotation += (Math.PI / 800) * elapsedTime;  // 800 because that's a good arbitrary number for slow turns
    }

    function moveUp(elapsedTime) {
        spec.center.y -= (spec.moveRate * elapsedTime);
    }

    function moveDown(elapsedTime) {
        spec.center.y += (spec.moveRate * elapsedTime);
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    let api = {
        updateRotation: updateRotation,
        turnLeft: turnLeft,
        turnRight: turnRight,
        moveUp: moveUp,
        moveDown: moveDown,
        moveTo: moveTo,
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; }
    };

    return api;
}

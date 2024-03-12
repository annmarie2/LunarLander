// --------------------------------------------------------------
//
// Creates a Logo object, with functions for managing state.
//
// spec = {
//    imageSrc: ,   // Web server location of the image
//    center: { x: , y: },
//    size: { width: , height: },
//    gravity: { x: , y: },
//    momentum: { x: , y: },
//    orientation: { x: , y: },
// }
//
// --------------------------------------------------------------
MyGame.objects.Lander = function(spec) {
    'use strict';

    let rotation = 90 * Math.PI / 180; // start the lander on its side
    let gravity = { x: 0, y: 0.01 };
    let momentum = {x: 1.0, y: 0 };
    let thrust = { x: 0, y: 0 };
    let orientation = { x: 1, y: 0};
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
    function updateMomentum() {
        // add them all together babyyyyyy
        momentum.x += gravity.x;
        momentum.x += thrust.x;

        momentum.y += gravity.y;
        momentum.y += thrust.y;
    }

    function updatePosition() {
        spec.center.x += momentum.x;
        spec.center.y += momentum.y;
    }

    function update() {
        updateMomentum();
        updatePosition();
        updateOrientation();
    }

    function updateOrientation() {

        if (rotation > 20 * Math.PI / 180 && rotation < 160 * Math.PI / 180) {
            orientation.x = 1;
        }
        else if (rotation > 200 * Math.PI / 180 && rotation < 340 * Math.PI / 180) {
            orientation.x = -1;
        }
        else {
            orientation.x = 0;
        }

        if ((rotation > 290 * Math.PI / 180) || (rotation < 70 * Math.PI / 180)) {
            orientation.y = 1;
        }
        else if (rotation > 110 * Math.PI / 180 && rotation < 250 * Math.PI / 180) {
            orientation.y = -1;
        }
        else {
            orientation.y = 0;
        }
    }

    function turnLeft(elapsedTime) {
        rotation -= (Math.PI / 1000) * elapsedTime;  // 800 because that's a good arbitrary number for slow turns
        rotation %= 360 * Math.PI / 180;
        if (rotation < 0) {
            rotation = 360 * Math.PI / 180 + rotation;
        }
    }

    function turnRight(elapsedTime) {
        rotation += (Math.PI / 1000) * elapsedTime;  // 800 because that's a good arbitrary number for slow turns
        rotation %= 360 * Math.PI / 180;
        if (rotation < 0) {
            rotation = 360 * Math.PI / 180 + rotation;
        }
    }

    // TODO: Update based on elapsedTime? :))
    function moveUp(elapsedTime) {
        if (orientation.x > 0) {
            momentum.x += 0.005 * elapsedTime;
        } 
        else if (orientation.x < 0) {
            momentum.x -= 0.005 * elapsedTime;
        }

        if (orientation.y > 0) {
            momentum.y -= 0.005 * elapsedTime;
        }
        else if (orientation.y < 0) {
            momentum.y += 0.005 * elapsedTime;
        }
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    let api = {
        updateRotation: updateRotation,
        update: update,
        turnLeft: turnLeft,
        turnRight: turnRight,
        moveUp: moveUp,
        moveTo: moveTo,
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get gravity() { return gravity; },
        get momentum() { return momentum; },
        get orientation() { return orientation; },
        get thrust() { return thrust; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; }
    };

    return api;
}

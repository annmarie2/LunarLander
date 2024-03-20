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
    let fuel = 20;
    let imageReady = false;
    let image = new Image();

    // prolly consolidate these two eventually 
    let collided = false;
    let crashed = false;

    let startTime = performance.now();
    let endTime = null;
    let score = 0;

    // let myKeyboard = input.Keyboard();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function updateRotation(howMuch) {
        rotation += howMuch;
    }

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

    function inSafeZone(myTerrain, minX, maxX) {
        // console.log(myTerrain);
        // console.log("minX: ", minX, "maxX: ", maxX, "myTerrain.safeZoneStartX: ", myTerrain.safeZoneStartX, "myTerrain.safeZoneStartX2: ", myTerrain.safeZoneStartX2, "myTerrain.getSafeZoneDistance(): ", myTerrain.getSafeZoneDistance());
        if (myTerrain.level == 1) {
            let landedOne = minX > myTerrain.safeZoneStartX && maxX < myTerrain.safeZoneStartX + myTerrain.getSafeZoneDistance();
            let landedTwo = minX > myTerrain.safeZoneStartX2 && maxX < myTerrain.safeZoneStartX2 + myTerrain.getSafeZoneDistance();
            if (landedOne || landedTwo) {
                return true;
            }    
        } else {
            if (minX > myTerrain.safeZoneStartX && maxX < myTerrain.safeZoneStartX + myTerrain.getSafeZoneDistance()) {
                return true;
            }
        }
        return false;
    }

    function specsGood() {
        if (verticalSpeed() > 2 || angle() > 10 * Math.PI / 180) { // same as in text.js
            return false;
        }
        return true;
    }

    function checkCollisions(myTerrain) {
        if (myTerrain.lst.length > 1) {
            let circle = { center: {x: spec.center.x, y: spec.canvasSize.height - spec.center.y}, radius: spec.size.x / 2 };
            
            let landerMinX = Math.floor((spec.center.x - spec.size.x / 2) / spec.canvasSize.width * myTerrain.lst.length);
            let landerMaxX = Math.floor((spec.center.x + spec.size.x / 2) / spec.canvasSize.width * myTerrain.lst.length);
            
            for (let i = landerMinX; i < landerMaxX; i++) {
                let pt1 = { x: i, y: spec.canvasSize.height - myTerrain.lst[i] };  // calculate canvas height 
                let pt2 = { x: i + 1, y: spec.canvasSize.height - myTerrain.lst[i + 1] };

                if (pt1.y > circle.center.y - circle.radius || pt2.y > circle.center.y - circle.radius) {
                    collided = true;

                    if (!inSafeZone(myTerrain, landerMinX, landerMaxX) || !specsGood()) {
                        crashed = true;
                        console.log("crashed!");
                    } else {
                        endTime = performance.now();
                    }
                }
            }
        }
    }

    function updateScore(persistence) {
        if (endTime != null) {
            score = Math.floor(endTime - startTime + fuel);
            persistence.addScore(score, score);
        }
    }

    function update(myTerrain, particleManager, persistence) {
        if (!collided) {
            updateMomentum();
            updatePosition();
            updateOrientation();
            checkCollisions(myTerrain);
        }
        else if (!crashed){
            // new level now :)
            updateScore(persistence);
            console.log(score);
        }
        else {
            particleManager.shipCrash(spec.center.x, spec.center.y);
        }
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
        if (!crashed) {
            rotation -= (Math.PI / 1000) * elapsedTime;  // 1000 because that's a good arbitrary number for slow turns
            rotation %= 360 * Math.PI / 180;
            if (rotation < 0) {
                rotation = 360 * Math.PI / 180 + rotation;
            }    
        }
    }

    function turnRight(elapsedTime) {
        if (!crashed) {
            rotation += (Math.PI / 1000) * elapsedTime;  // 1000 because that's a good arbitrary number for slow turns
            rotation %= 360 * Math.PI / 180;
            if (rotation < 0) {
                rotation = 360 * Math.PI / 180 + rotation;
            }    
        }
    }

    function moveUp(elapsedTime, particleManager) {
        if (fuel > 0 && !crashed) {

            if (orientation.x > 0) {
                momentum.x += 0.003 * elapsedTime;
            } 
            else if (orientation.x < 0) {
                momentum.x -= 0.003 * elapsedTime;
            }
    
            if (orientation.y > 0) {
                momentum.y -= 0.003 * elapsedTime;
            }
            else if (orientation.y < 0) {
                momentum.y += 0.003 * elapsedTime;
            }
    
            fuel -= .1;
        }
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    function verticalSpeed() {
        return Math.abs(momentum.y * 3);  // 3 because we need some arbitrary conversion to m/s
    }

    function angle() {
        if (rotation > Math.PI) {
            return Math.abs((360 * Math.PI / 180) - rotation);
        } else {
            return rotation;
        }
    }

    let api = {
        updateRotation: updateRotation,
        verticalSpeed: verticalSpeed,
        angle: angle,
        update: update,
        turnLeft: turnLeft,
        turnRight: turnRight,
        moveUp: moveUp,
        moveTo: moveTo,
        get crashed() { return crashed; },
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get gravity() { return gravity; },
        get momentum() { return momentum; },
        get orientation() { return orientation; },
        get thrust() { return thrust; },
        get fuel() { return fuel; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get canvasSize() { return spec.canvasSize; },
        get collided() { return collided; }
    };

    return api;
}

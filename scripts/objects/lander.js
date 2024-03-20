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

    // Reference: https://stackoverflow.com/questions/37224912/circle-line-segment-collision
    function lineCircleIntersection(pt1, pt2, circle) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) { // no intercept
            return false;
        }
        // These represent the unit distance of point one and two on the line
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
            return true;
        }
        return false;
    }

    function checkCollisions(myTerrain) {
        if (myTerrain.lst.length > 1) {
            let circle = { center: {x: spec.center.x, y: spec.canvasSize.height - spec.center.y}, radius: spec.size.x / 2 };
            
            let landerMinX = Math.floor((spec.center.x - spec.size.x / 2) / spec.canvasSize.width * myTerrain.lst.length);
            let landerMaxX = Math.floor((spec.center.x + spec.size.x / 2) / spec.canvasSize.width * myTerrain.lst.length);
            
            for (let i = landerMinX; i < landerMaxX; i++) {
                let pt1 = { x: i, y: spec.canvasSize.height - myTerrain.lst[i] };  // calculate canvas height 
                let pt2 = { x: i + 1, y: spec.canvasSize.height - myTerrain.lst[i + 1] };

                // IDK why but this /isn't/ working; it only detects collisions at x's starting point...
                // if (lineCircleIntersection(pt1, pt2, circle)) {
                //     console.log("a collision!!");
                //     // console.log(pt1, pt2, circle)
                // }
                if (pt1.y > circle.center.y - circle.radius || pt2.y > circle.center.y - circle.radius) {
                    collided = true;

                    console.log("collided! ", landerMinX, landerMaxX, myTerrain.safeZoneStartX, myTerrain.safeZoneStartX + myTerrain.safeZoneDistance);
                    if (landerMinX < myTerrain.safeZoneStartX || landerMaxX > myTerrain.safeZoneStartX + myTerrain.safeZoneDistance) {
                        crashed = true;
                    }
                }
            }
        }
    }

    function update(myTerrain, particleManager) {
        if (!collided) {
            updateMomentum();
            updatePosition();
            updateOrientation();
            checkCollisions(myTerrain);    
        }
        else if (!crashed){
            // new level now :)
        }
        else if (crashed) {
            particleManager.shipCrash(spec.center.x, spec.center.y);
            console.log("crashed!");
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

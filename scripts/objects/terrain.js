// --------------------------------------------------------------
//
// Creates a Terrain object, with functions for managing state.
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
MyGame.objects.terrain = function(spec) {
    'use strict';

    let level = spec.level;
    let safeZoneStartX = null;
    let safeZoneStartX2 = null;

    // GOT THIS CODE FROM GOOD OL GPT :)
    function generateGaussianRandom() {
        let u1, u2;
        let z0, z1;
        
        do {
            u1 = Math.random();
            u2 = Math.random();
        } while (u1 <= Number.EPSILON); // Make sure u1 is not zero to avoid log(0)
        
        z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
        
        // z0 and z1 are two independent standard normal random variables
        // We can use one of them as the Gaussian random number with mean 0 and variance 1
        return z0;
    }

    function addEndpoints(lst) {
        // add endpoints, randomly choose their elevations:
        let startY = Math.floor(Math.random() * spec.canvasHeight / 2) + (spec.canvasHeight * .4);
        let endY = Math.floor(Math.random() * spec.canvasHeight / 2) + (spec.canvasHeight * .4);
        lst[0] = startY;
        lst[lst.length - 1] = endY;
    }

    function implementSafeZone(lst, startX, distance) {
        let segmentWidth = spec.canvasWidth / (lst.length - 1);

        // ENSURE THE SAFE ZONE IS AT LEAST 15% AWAY FROM THE BORDERS
        if ((startX * segmentWidth) < (spec.canvasWidth * .15)) {
            startX = Math.floor((spec.canvasWidth * .15) / segmentWidth);
        } 
        else if ((startX * segmentWidth + (distance * segmentWidth)) > (spec.canvasWidth - spec.canvasWidth * .15)) {
            startX = Math.floor((spec.canvasWidth - spec.canvasWidth * 0.15 - segmentWidth * distance) / segmentWidth)
        }
    
        // ensure the height of the safe zone isn't more than a little over halfway up the screen
        let safeZoneStartY = Math.floor(Math.random() * (spec.canvasHeight / 2)) + (spec.canvasHeight * .4);
        
        // put the safe zone in the list
        for (let i = startX; i < startX + distance; i++) {
            lst[i] = safeZoneStartY;
        }
    }

    function addSafeZone(lst, safeZoneDistance, startX) {
        // console.log(lst.length, safeZoneDistance, startX);
        if (startX == null) {
            safeZoneStartX = Math.floor(Math.random() * lst.length);
            implementSafeZone(lst, safeZoneStartX, safeZoneDistance);
        } else {
            safeZoneStartX2 = startX;
            implementSafeZone(lst, safeZoneStartX2, safeZoneDistance);
        }
    }

    function computeElevation(ax, bx, ay, by, s) {
        let rg = generateGaussianRandom();
        // let rg = Random.nextGaussian(0,1);
        let r = s * rg * (bx - ax);
        let midpoint = .5 * (ay + by) + r;
        if (midpoint < (spec.canvasHeight * .4)) {
            midpoint = (spec.canvasHeight * .4);
        }
        if (midpoint > spec.canvasHeight) {
            midpoint = spec.canvasHeight;
        }
        return midpoint;
    }

    function generateTerrain(idx, iterations, lst) {
        // only fill spot with a value if it's empty; this way the safe zones remain untouched
        if (lst[idx] === undefined) {
            let ax = idx - Math.pow(2, iterations - 1);
            let ay = lst[ax];
            let bx = idx + Math.pow(2, iterations - 1);
            let by = lst[bx];
            lst[idx] = computeElevation(ax, bx, ay, by, spec.s);
        }
        if (iterations - 1 > 0) {
            let lowerHalfIdx = idx - Math.pow(2, iterations - 2);
            let upperHalfIdx = idx + Math.pow(2, iterations - 2);
            spec.s -= 0.01;
            generateTerrain(lowerHalfIdx, iterations - 1, lst);
            generateTerrain(upperHalfIdx, iterations - 1, lst);
        }
    }


    function initializeList() {

        // calculate how many points will be in the line:
        let numPoints = Math.pow(2, spec.iterations) + 1;
        let lst = new Array(numPoints);

        addEndpoints(lst);
        if (level == 1) {
            console.log("level == 1");
            addSafeZone(lst, spec.safeZoneDistance + spec.safeZoneDistance / 4, null);
            if (safeZoneStartX < lst.length / 2) {
                safeZoneStartX2 = safeZoneStartX + Math.floor(lst.length / 3);
                console.log("safeStart, lstLength: ", safeZoneStartX, Math.floor(lst.length / 3));
                console.log("startX2: ", safeZoneStartX2);
                // console.log("safeZoneDistance: ", spec.safeZoneDistance * 4); 
                addSafeZone(lst, spec.safeZoneDistance + spec.safeZoneDistance / 4, safeZoneStartX2);
                // console.log("safeZoneSTartX2: ", safeZoneStartX2);

            } else {
                safeZoneStartX2 = safeZoneStartX - Math.floor(lst.length / 3);
                
                console.log("safeStart, lstLength: ", safeZoneStartX, Math.floor(lst.length / 3));
                console.log("startX2: ", safeZoneStartX2);

                addSafeZone(lst, spec.safeZoneDistance + spec.safeZoneDistance / 4, safeZoneStartX2);
            }

            console.log(safeZoneStartX, safeZoneStartX2);
        } else {
            console.log("level == 2");
            addSafeZone(lst, spec.safeZoneDistance, null);
        }

        console.log(safeZoneStartX, safeZoneStartX2);



        let middleIndex = Math.floor(lst.length / 2);
    
        generateTerrain(middleIndex, spec.iterations, lst);

        return lst;
    }

    function getSafeZoneDistance() {
        if (level == 1) {
            return spec.safeZoneDistance + (spec.safeZoneDistance / 2);
        } else {
            return spec.safeZoneDistance;
        }
    }

    let lst = initializeList();

    let api = {
        lst: lst,
        getSafeZoneDistance: getSafeZoneDistance,
        get iterations() { return spec.iterations; },
        get s() { return spec.s; },
        get level() { return level; },
        get safeZoneStartX() { return safeZoneStartX; },
        get safeZoneStartX2() { return safeZoneStartX2; },
        get canvasHeight() { return spec.canvasHeight; },
        get canvasWidth() { return spec.canvasWidth; },
    };

    return api;
}

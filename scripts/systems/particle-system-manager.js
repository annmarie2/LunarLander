//------------------------------------------------------------------
//
// This is the particle system use by the game code
//
//------------------------------------------------------------------
MyGame.systems.ParticleSystemManager = (function(systems, renderer, graphics) {
    'use strict';

    let particlesThrust = null;
    let renderThrust = null;

    let particlesFire = null;
    let renderFire = null;

    // let shipCrashed = null;

    function shipThrust(myLander) {

    }

    function shipCrash(x, y) {
        particlesFire = systems.ParticleSystem({
                center: { x: x, y: y },
                size: { mean: 10, stdev: 4 },
                speed: { mean: 100, stdev: 25 },
                lifetime: { mean: 2.5, stdev: 1 },
                systemLifetime: 1.5,
                direction: {max: 2 * Math.PI, min: 0},
                generateNew: true
            },
            graphics);

        renderFire = renderer.ParticleSystem(particlesFire, graphics, 'assets/fireball.png');
    }

    function update(myLander, elapsedTime) {
        if (particlesThrust != null) {
            particlesThrust.update({ 
                center: {x: myLander.center.x, y: myLander.center.y}, 
                rotate: false, 
                systemLifetime: myLander.fuel, 
                direction: { max: myLander.rotation + (5 * Math.PI / 180) + (Math.PI / 2), min: myLander.rotation - (5 * Math.PI / 180) + (Math.PI / 2) } 
            }, 
            elapsedTime);
        }

        if (particlesFire != null) {
            particlesFire.update({
                center: {x: myLander.center.x, y: myLander.center.y}, 
                rotate: true, 
                systemLifetime: 5, 
                direction: { max: 2 * Math.PI, min: 0 } 
            }, 
            elapsedTime);
        }
    }

    function render() {
        if (renderThrust != null) {
            renderThrust.render();
        }

        if (renderFire != null) {
            renderFire.render();
        }
    }

    let api = {
        update: update,
        render: render,
        shipThrust: shipThrust,
        shipCrash: shipCrash
    };

    return api;
}(MyGame.systems, MyGame.render, MyGame.graphics));

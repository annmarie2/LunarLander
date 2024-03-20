//------------------------------------------------------------------
//
// This is the particle system use by the game code
//
//------------------------------------------------------------------
MyGame.systems.ParticleSystemManager = (function(systems, renderer, graphics) {
    'use strict';

    function shipThrust(myLander) {

    }

    function shipCrash(x, y) {
        let particlesFire = systems.ParticleSystem({
                center: { x: x, y: y },
                size: { mean: 10, stdev: 4 },
                speed: { mean: 100, stdev: 25 },
                lifetime: { mean: 2.5, stdev: 1 },
                systemLifetime: 1.5,
                direction: {max: 2 * Math.PI, min: 0},
                generateNew: true
            },
            graphics);
        let renderFire = renderer.ParticleSystem(particlesFire, graphics, 'assets/fireball.png');
        console.log(renderer, renderer.ParticleSystem(particlesFire, graphics, 'assets/fireball.png'))

        // console.log(particlesFire.systemLifetime);

        let lastTimeStamp = performance.now();
        while (particlesFire.systemLifetime > 0) {
            let time = performance.now();
            let elapsedTime = time - lastTimeStamp;
            lastTimeStamp = time;

            particlesFire.update({ 
                center: {x: x, y: y}, 
                rotate: true, 
                // systemLifetime: , 
                direction: { max: 2 * Math.PI, min: 0 } 
            }, 
            elapsedTime);

            // console.log(renderFire);
            renderFire.render();

            // console.log("in while loop");
        }

        // console.log("exited while loop");
    }

    let api = {
        shipThrust: shipThrust,
        shipCrash: shipCrash
    };

    return api;
}(MyGame.systems, MyGame.render, MyGame.graphics));

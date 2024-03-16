//------------------------------------------------------------------
//
// This is the particle system use by the game code
//
//------------------------------------------------------------------
MyGame.systems.ParticleSystem = function(spec) {
    'use strict';
    let nextName = 1;       // Unique identifier for the next particle
    let particles = {};
    let systemLifetime = spec.systemLifetime;
    let myLander = spec.myLander;

    //------------------------------------------------------------------
    //
    // This creates one new particle
    //
    //------------------------------------------------------------------
    function create() {
        // let p = {
        //         center: {x: spec.center.x, y: spec.center.y},
        //         radius: spec.radius,
        //         startAngle: spec.startAngle,
        //         endAngle: spec.endAngle,
        //         direction: Random.nextCircleVector(),
        //         speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
        //         rotation: 0,
        //         lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),    // How long the particle should live, in seconds
        //         alive: 0    // How long the particle has been alive, in seconds
        //     };
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let p = {
            center: {x: spec.center.x, y: spec.center.y},
            size: { x: size, y: size },
            direction: Random.nextCircleVector(2 * Math.PI, 0),
            speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
            rotation: 0,
            lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),    // How long the particle should live, in seconds
            alive: 0    // How long the particle has been alive, in seconds
        };

        if (myLander != null) {
            p.direction = Random.nextCircleVector(myLander.rotation + (5 * Math.PI / 180), myLander.rotation - (5 * Math.PI / 180));
            p.center.x = myLander.center.x;
            p.center.y = myLander.center.y;
        }


        return p;
    }

    //------------------------------------------------------------------
    //
    // Update the state of all particles.  This includes removing any that have exceeded their lifetime.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        let removeMe = [];

        //
        // We work with time in seconds, elapsedTime comes in as milliseconds
        elapsedTime = elapsedTime / 1000;

        Object.getOwnPropertyNames(particles).forEach(function(value, index, array) {
            let particle = particles[value];
            //
            // Update how long it has been alive
            particle.alive += elapsedTime;

            //
            // Update its center
            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

            //
            // Rotate proportional to its speed
            if (myLander == null) {
                particle.rotation += particle.speed / 500;
            }

            //
            // If the lifetime has expired, identify it for removal
            if (particle.alive > particle.lifetime) {
                removeMe.push(value);
            }
        });

        //
        // Remove all of the expired particles
        for (let particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
        removeMe.length = 0;

        //
        // If the generator hasn't run out of time to generate new particles
        if (systemLifetime > 0) {
            if (myLander == null || )
            //
            // Generate some new particles
            for (let particle = 0; particle < 1; particle++) {
                //
                // Assign a unique name to each particle
                particles[nextName++] = create();
            }
        }

        if (myLander != null) {
            systemLifetime = myLander.fuel;
        } else {
            systemLifetime -= elapsedTime;
        }
    }

    let api = {
        update: update,
        get particles() { return particles; }
    };

    return api;
}

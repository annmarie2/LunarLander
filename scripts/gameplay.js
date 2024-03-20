MyGame.screens['game-play'] = (function(game, objects, renderer, systems, graphics, input, persistence) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();
    // let myControls = input.Controls();

    let myBackground = objects.Background({
        imageSrc: 'assets/m106.jpg',
        startPoint: { x: 0, y: 0 },
        size: { width: graphics.canvas.width, height: graphics.canvas.height }
    });

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: 50, y: 50 },
        size: { x: 35, y: 35 },
        moveRate: 500 / 1000,    // pixels per millisecond
        canvasSize: { width: graphics.canvas.width, height: graphics.canvas.height }
    });

    let particleManager = systems.ParticleSystemManager;
    particleManager.shipThrust(myLander);

    let fuelText = objects.Text({
        text: "fuel: " + String(myLander.fuel),
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: graphics.canvas.width - 115, y: 20 }
    });

    let verticalSpeedText = objects.Text({
        text: "vertical speed: " + String(myLander.momentum.x) + " m/s",
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: graphics.canvas.width - 250, y: 50 }
    });

    let angleText = objects.Text({
        text: "angle: " + String(myLander.angle),
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: graphics.canvas.width - 120, y: 80 }
    });

    let myTerrain = objects.terrain({
        iterations: 8,
        s: 1.5,
        safeZoneDistance: 40,
        canvasHeight: graphics.canvas.height,
        canvasWidth: graphics.canvas.width
    });

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        // if (!myLander.collided) {
            myLander.update(myTerrain, particleManager);
            fuelText.updateFuel(myLander.fuel);
            verticalSpeedText.updateVerticalSpeed(myLander.verticalSpeed());
            angleText.updateAngle(myLander.angle());
            particleManager.update(myLander, elapsedTime);

            // particlesThrust.update({ 
            //     center: {x: myLander.center.x, y: myLander.center.y}, 
            //     rotate: false, 
            //     systemLifetime: myLander.fuel, 
            //     direction: { max: myLander.rotation + (5 * Math.PI / 180) + (Math.PI / 2), min: myLander.rotation - (5 * Math.PI / 180) + (Math.PI / 2) } 
            // }, 
            // elapsedTime);
    
        // } else {
            // particlesFire.update({ 
            //     center: {x: myLander.center.x, y: myLander.center.y}, 
            //     rotate: true, 
            //     systemLifetime: 5, 
            //     direction: { max: 2 * Math.PI, min: 0 } 
            // }, 
            // elapsedTime);
        // }
    }

    function render() {
        graphics.clear();

        renderer.Background.render(myBackground);
        renderer.Terrain.render(myTerrain);
        renderer.Text.render(fuelText);
        renderer.Text.render(verticalSpeedText);
        renderer.Text.render(angleText);
        particleManager.render();
        renderer.Lander.render(myLander);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        // myKeyboard.register('s', myLander.moveDown);

        myKeyboard.register(persistence.getMoveUp(), myLander.moveUp);
        myKeyboard.register(persistence.getMoveUp(), particleManager.toggleShowThrust);
        myKeyboard.register(persistence.getTurnLeft(), myLander.turnLeft);
        myKeyboard.register(persistence.getTurnRight(), myLander.turnRight);
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        let canvas = document.getElementById('id-canvas');
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.systems, MyGame.graphics, MyGame.input, MyGame.persistence));

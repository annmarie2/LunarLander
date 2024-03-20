MyGame.screens['game-play'] = (function(game, objects, renderer, systems, graphics, input, persistence) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();
    let soundPlayer = systems.SoundSystem();

    //
    // KEEPS TRACK OF WHAT "LEVEL" YOU'RE ON
    // 1 for the first level with two landings
    // 2 for the second level with one landing
    // 3 for completed whole game
    let gameLevel = 1;

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
        canvasSize: { width: graphics.canvas.width, height: graphics.canvas.height },
        soundSystem: soundPlayer
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

    let winText = objects.Text({
        text: "SUCCESSFUL LANDING",
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 }
    });

    let myTerrain = objects.terrain({
        iterations: 8,
        s: 1.5,
        safeZoneDistance: 40,
        canvasHeight: graphics.canvas.height,
        canvasWidth: graphics.canvas.width,
        level: gameLevel
    });

    function registerKeys() {
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
    }

    function updateGameLevel(myLander) {
        if (gameLevel == 1) {
            if (myLander.wonLevel) {
                console.log("won level 1!!");
                gameLevel = 2;

                renderer.Text.render(winText);

                // myTerrain.nextLevel;
                myTerrain = objects.terrain({
                    iterations: 8,
                    s: 1.5,
                    safeZoneDistance: 40,
                    canvasHeight: graphics.canvas.height,
                    canvasWidth: graphics.canvas.width,
                    level: gameLevel
                });

                myLander = objects.Lander({
                    imageSrc: 'assets/lander.png',
                    center: { x: 50, y: 50 },
                    size: { x: 35, y: 35 },
                    moveRate: 500 / 1000,    // pixels per millisecond
                    canvasSize: { width: graphics.canvas.width, height: graphics.canvas.height },
                    soundSystem: soundPlayer
                });
            }
        }
        else if (gameLevel == 2) {
            if (myLander.wonLevel) {
                console.log("won level 2!!");
                gameLevel = 3;
                // some animation here to say you won :)
            }
        }
    }

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        myLander.update(myTerrain, particleManager, persistence);
        fuelText.updateFuel(myLander.fuel);
        verticalSpeedText.updateVerticalSpeed(myLander.verticalSpeed());
        angleText.updateAngle(myLander.angle());
        particleManager.update(myLander, elapsedTime);
        updateGameLevel(myLander);
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
        let canvas = document.getElementById('id-canvas');
    }

    function run() {
        registerKeys();
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.systems, MyGame.graphics, MyGame.input, MyGame.persistence));

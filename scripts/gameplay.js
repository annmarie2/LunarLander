MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();

    let myBackground = objects.Background({  // ADDED THIS!!
        imageSrc: 'assets/m106.jpg',
        startPoint: { x: 0, y: 0 },
        size: { width: graphics.canvas.width, height: graphics.canvas.height }
    });

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: 50, y: 50 },
        size: { width: 35, height: 35 },
        moveRate: 500 / 1000    // pixels per millisecond
    });

    let fuelText = objects.Text({
        text: "fuel: " + String(myLander.fuel),
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 100, y: 100 }
        // position: { x: graphics.canvas.width + graphics.canvas.width / 20, y: graphics.canvas.width / 2 }
    });

    let verticalSpeedText = objects.Text({
        text: "vertical speed: " + String(myLander.momentum.x) + " m/s",
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 100, y: 150 }
    });

    let angleText = objects.Text({
        text: "angle: " + String(myLander.angle),
        font: '16pt Arial',
        fillStyle: 'rgba(0, 255, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 100, y: 200 }    
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

    function update() {
        myLander.update();
        fuelText.updateFuel(myLander.fuel);
        verticalSpeedText.updateVerticalSpeed(myLander.verticalSpeed());
        angleText.updateAngle(myLander.angle());
    }

    function render() {
        graphics.clear();

        renderer.Background.render(myBackground);
        renderer.Terrain.render(myTerrain);
        renderer.Lander.render(myLander);
        renderer.Text.render(fuelText);
        renderer.Text.render(verticalSpeedText);
        renderer.Text.render(angleText);
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
        myKeyboard.register('w', myLander.moveUp);
        myKeyboard.register('a', myLander.turnLeft);
        myKeyboard.register('d', myLander.turnRight);
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

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input));

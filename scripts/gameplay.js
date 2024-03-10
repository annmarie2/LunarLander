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

    let myText = objects.Text({
        text: 'boom!',
        font: '32pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 50, y: 100 }
    });

    let myLander = objects.Lander({
        imageSrc: 'assets/lander.png',
        center: { x: 50, y: 50 },
        size: { width: 35, height: 35 },
        moveRate: 500 / 1000    // pixels per millisecond
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
        // myLander.updateRotation(Math.PI / 150);   // Uh, oh, fixed per frame!!
    }

    function render() {
        graphics.clear();

        renderer.Background.render(myBackground); // ADDED THIS!!
        renderer.Terrain.render(myTerrain);
        renderer.Lander.render(myLander);
        // renderer.Text.render(myText);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update();
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        myKeyboard.register('s', myLander.moveDown);
        myKeyboard.register('w', myLander.moveUp);
        myKeyboard.register('a', myLander.moveLeft);
        myKeyboard.register('d', myLander.moveRight);
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

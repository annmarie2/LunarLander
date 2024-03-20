MyGame.screens['custom-control'] = (function(game, input, persistence) {
    'use strict';

    // let myKeyboard = input.Keyboard();
    // let turnLeft = 'a';
    // let turnRight = 'd';
    // let moveUp = 'w';

    // let myControls = input.Controls();

    persistence.reportCustomControls();

    function customTurnLeft() {
        window.addEventListener('keydown', function (e) {
            console.log("turnLeft", e.key);
            // myControls.changeTurnLeft(e.key, persistence);
            persistence.changeCustomControl('left', e.key);
        });
    }

    function customTurnRight() {
        window.addEventListener('keydown', function (e) {
            console.log("turnRight", e.key);
            // myControls.changeTurnRight(e.key);
            persistence.changeCustomControl('right', e.key);
        });
    }

    function customMoveUp() {
        window.addEventListener('keydown', function (e) {
            console.log("moveUp", e.key);
            // myControls.changeMoveUp(e.key);
            persistence.changeCustomControl('up', e.key);
        });
    }
    
    function initialize() {
        document.getElementById('id-custom-control-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); }
        );

        document.getElementById('id-custom-control-turn-left').addEventListener(
            'click',
            customTurnLeft
            );

        document.getElementById('id-custom-control-turn-right').addEventListener(
            'click',
            customTurnRight
            );

        document.getElementById('id-custom-control-move-up').addEventListener(
            'click',
            customMoveUp);
    }
    
    function run() {
        // lastTimeStamp = performance.now();
        // cancelNextRequest = false;
        // requestAnimationFrame(gameLoop);
    }
    
    return {
        initialize : initialize,
        run : run,
        get turnLeft() { return turnLeft; },
        get turnRight() { return turnRight; },
        get moveUp() { return moveUp; }
    };
}(MyGame.game, MyGame.input, MyGame.persistence));

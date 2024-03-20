MyGame.screens['custom-control'] = (function(game, input, persistence) {
    'use strict';

    // let myKeyboard = input.Keyboard();
    // let turnLeft = 'a';
    // let turnRight = 'd';
    // let moveUp = 'w';

    // let myControls = input.Controls();

    persistence.reportCustomControls();

    // function customTurnLeft() {
    //     window.addEventListener('keydown', function (e) {
    //         console.log("turnLeft", e.key);
    //         // myControls.changeTurnLeft(e.key, persistence);
    //         persistence.changeCustomControl('left', e.key);
    //     });
    // }

    // function customTurnRight() {
    //     window.addEventListener('keydown', function (e) {
    //         console.log("turnRight", e.key);
    //         // myControls.changeTurnRight(e.key);
    //         persistence.changeCustomControl('right', e.key);
    //     });
    // }

    // function customMoveUp() {
    //     window.addEventListener('keydown', function (e) {
    //         console.log("moveUp", e.key);
    //         // myControls.changeMoveUp(e.key);
    //         persistence.changeCustomControl('up', e.key);
    //     });
    // }

    function keydownHandler(action, event) {
        // Prevent default action of the key press (e.g., scrolling)
        event.preventDefault();

        // Store the key in local storage
        persistence.changeCustomControl(action, event.key);

        // Remove the event listener to prevent further key presses from being captured
        document.removeEventListener("keydown", keydownHandler);
    }

    function setControl(action) {
        document.addEventListener("keydown", (event) => {
            keydownHandler(action, event);
        }, {once: true}); // This ensures the event listener is removed after the first keydown event
    }
    
    function initialize() {
        document.getElementById('id-custom-control-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); }
        );

        document.getElementById('id-custom-control-turn-left').addEventListener('click', function() { 
            setControl("left"); 
        });

        document.getElementById('id-custom-control-turn-right').addEventListener('click', function() { 
            setControl("right"); 
        });

        document.getElementById('id-custom-control-move-up').addEventListener('click', function() { 
            setControl("up"); 
        });
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

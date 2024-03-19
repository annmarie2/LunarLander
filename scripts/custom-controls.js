MyGame.screens['custom-control'] = (function(game, input) {
    'use strict';

    let myKeyboard = input.Keyboard();

    
    function initialize() {
        document.getElementById('id-custom-control-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }
    
    function run() {
        // lastTimeStamp = performance.now();
        // cancelNextRequest = false;
        // requestAnimationFrame(gameLoop);
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.input));

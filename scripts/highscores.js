MyGame.screens['high-scores'] = (function(game, persistence) {
    'use strict';
    
    function initialize() {
        // persistence.add(1,2);
        // persistence.add(3,4);
        persistence.report();

        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });

        // document.getElementById('id-high-scores-list').textContent = "poo";
    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.persistence));
